import { takeEvery, put, call, select, take, race } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import config from 'config';
import sdk from 'reputation-sdk';
import omit from 'lodash/omit';
import keys from 'lodash/keys';
import find from 'lodash/find';
import { push } from 'connected-react-router';
import convertCallbackToPromise from 'utils/convertCallbackToPromise';
import MonethaError from 'utils/MonethaError';
import isValidAddress from 'utils/isValidAddress';
import isValidDecimal from 'utils/isValidDecimal';
import isValidDateRange from 'utils/isValidDateRange';
import calcUpdatedVersion from 'utils/calcUpdatedVersion';
import sanitzeDecmials from 'utils/sanitzeDecmials';
import constructMomentFromDate from 'utils/constructMomentFromDate';
import {
  getContractInstance,
  waitForTxToFinish,
  hasTxFailed,
} from 'utils/web3';
import abi from '../../abis/development.json';
import {
  ANALYSE_NEW_ICO,
  REANALYSE_NEW_ICO,
  PREPARE_TO_EDIT_ICOPASS_START,
  PREFILL_EDIT_ICOPASS_FORM,
} from './constants';
import messages from './messages';
import { startLoader, stopLoader, showPopup } from '../App/actions';
import { POPUP_ACCEPTED, HIDE_POPUP } from '../App/constants';
import {
  setFormDataError,
  setFormSumbissionError,
  unsetFormSumbissionError,
  unsetFormDataError,
  setPassportAddress,
  prefillEditIcopassForm,
  prepareToEditIcopassFinish,
  updateFormData,
} from './actions';
import makeSelectEditIcoPage, { selectAnalyseFormErrors } from './selectors';
import {
  selectRawDetails,
  selectCurrentIcoVersion,
} from '../IcoDetailPage/selectors';
import {
  reanalyseFinish,
  setIcoDetails,
  setCurrentIcoVersion,
} from '../IcoDetailPage/actions';
import {
  setRedirectPath,
  setRedirectTimeout,
  setRedirectPageName,
} from '../RedirectHandler/actions';
import { addDisplayMessage } from '../InfoPage/actions';
import { makeSelectLocation } from '../App/selectors';
import { Fees } from '../../const/fees';
import { weiToEth } from '../../utils/ethConvert';
import { ICORatingUrlPrefix } from '../../const/ico';
import { extractICONameFromUrl } from '../../utils/ico';

export function* analyseNewIco() {
  const {
    icoName,
    version,
    decimals,
    ownerAddress,
    passportAddress,
    crowdsaleAddress,
    tokenContractAddress,
  } = yield select(makeSelectEditIcoPage());

  const requestData = {
    metadata: {
      icoName,
      version: calcUpdatedVersion(version),
      decimals: sanitzeDecmials(decimals),
      ownerAddress,
      passportAddress,
      crowdsaleAddress,
      tokenContractAddress,
    },
  };

  yield call(processPaymentAndAnalyse, requestData);
}

export function* processPaymentAndAnalyse(requestData) {
  try {
    yield put(unsetFormSumbissionError());
    yield call(validateAnalysisData);

    const errors = yield select(selectAnalyseFormErrors);
    const hasError = !isEmpty(omit(errors, ['submit']));

    if (hasError) {
      throw new Error('Missing required field values');
    }

    const sanitizedRequestData = sanitizeAnalysisRequestData(requestData);

    yield put(
      showPopup({
        ...messages.confirmationMessage,
        values: { fee: weiToEth(Fees.serviceFee) },
      }),
    );
    const [accepted] = yield race([take(POPUP_ACCEPTED), take(HIDE_POPUP)]);

    if (accepted) {
      // gasLimit and transaction amount
      const tokenAddress = '0x0';

      // Using Timestamp to generate a random int id
      const orderId = Date.now();

      // Address of the current metamask account
      const accountAddress = window.web3.eth.accounts[0];

      // Start showing loader before making invoking contract methods
      yield put(startLoader(messages.confirmStorageFeeInMetamask));

      window.onbeforeunload = e => {
        const ev = e || window.event;

        // For IE and Firefox prior to version 4
        if (ev) {
          ev.returnValue =
            'Passport creation procedure will be lost if window is close. Are you sure?';
        }

        // For Safari
        return 'Passport creation procedure will be lost if window is close. Are you sure?';
      };

      const paymentProcessor = getContractInstance(
        abi.PaymentProcessor.abi,
        config.PAYMENT_PROCESSOR_ADDRESS,
      );

      // Invoking addOrder
      const addOrderTxHash = yield convertCallbackToPromise(
        paymentProcessor.addOrder,
        orderId,
        Fees.serviceFee,
        accountAddress,
        accountAddress,
        Fees.serviceFeeTXFee,
        tokenAddress,
        {
          gas: Fees.serviceFeeGAS.toString(),
        },
      );

      yield put(startLoader(messages.transactionExecutionMessage));

      // Wait until addOrder transaction finishes
      const adddOrderTxBlock = yield waitForTxToFinish(addOrderTxHash);
      if (hasTxFailed(adddOrderTxBlock)) {
        throw new Error('Transaction failed');
      }

      yield put(startLoader(messages.confirmMonethaFeeInMetamask));

      // Invoking securePay
      const securePayTxHash = yield convertCallbackToPromise(
        paymentProcessor.securePay,
        orderId,
        {
          value: Fees.serviceFee,
          gas: Fees.serviceFeeGAS.toString(),
        },
      );

      const url = 'https://lambda.monetha.io/ico-analyzer';
      const data = {
        ...sanitizedRequestData,
        metadata: {
          ...sanitizedRequestData.metadata,
          txHash: securePayTxHash,
          accountAddress,
          orderId,
        },
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      window.onbeforeunload = null;

      yield put(stopLoader());
      yield put(setRedirectPath('/'));
      yield put(setRedirectTimeout(15));
      yield put(setRedirectPageName('ICO List Page'));

      // set messages
      yield put(
        addDisplayMessage('analyseSuccess', {
          ...messages.analyseSuccess,
          values: { fee: weiToEth(Fees.serviceFee) },
        }),
      );

      yield put(push('/info'));
    }
  } catch (err) {
    window.onbeforeunload = null;
    const error = new MonethaError(err);
    yield put(setFormSumbissionError(error.formattedMessage));
    yield put(stopLoader());
  }
}

export function* reanalyseNewIco() {
  const rawDetails = yield select(selectRawDetails);
  const {
    icoName,
    decimals,
    ownerAddress,
    passportAddress,
    crowdsaleAddress,
    tokenContractAddress,
    cfr,
    icoEndDate,
    icoStartDate,
    icoPrice,
  } = yield select(makeSelectEditIcoPage());
  const version = yield select(selectCurrentIcoVersion);

  if (!isValidDateRange(icoStartDate, icoEndDate)) {
    yield put(
      setFormDataError('dateRange', messages.invalidDateRangeErrorMessage),
    );
  }

  rawDetails.metadata = {
    ...rawDetails.metadata,
    icoName,
    decimals,
    tokenContractAddress,
    crowdsaleAddress,
    ownerAddress,
    passportAddress,
    version: calcUpdatedVersion(version),
  };

  rawDetails.ico_info = {
    ...rawDetails.ico_info,
    ico_start_date: icoStartDate.format('DD MMM YYYY'),
    ico_end_date: icoEndDate.format('DD MMM YYYY'),
    ico_price: icoPrice,
    cfr,
  };

  yield call(processPaymentAndAnalyse, rawDetails);
  yield put(reanalyseFinish());
}

export function* validateAnalysisData() {
  const analysisData = yield select(makeSelectEditIcoPage());
  yield call(validateRequiredFields);
  yield call(validateDecimalsFields, analysisData);
  yield call(validateAddressFields);
  yield call(validateIcoPrice, analysisData);
  yield call(validateIcoName, analysisData);
}

export function* validateIcoPrice(analysisData) {
  const { icoPrice } = analysisData;
  const minLimit = 0.000000000000000001;
  const maxLimit = 9999999;

  if (icoPrice < minLimit || icoPrice > maxLimit) {
    yield put(setFormDataError('icoPrice', messages.invalidIcoPrice));
  }
}

export function* validateIcoName(analysisData) {
  const { icoName } = analysisData;

  if (!icoName || !extractICONameFromUrl(icoName)) {
    yield put(setFormDataError('icoName', messages.invalidIcoNameErrorMessage));
  }
}

export function* validateDecimalsFields(analysisData) {
  const { decimals } = analysisData;

  if (!isValidDecimal(decimals)) {
    yield put(
      setFormDataError('decimals', messages.invalidDecimalsErrorMessage),
    );
  }
}

export function* validateRequiredFields() {
  const analysisData = yield select(makeSelectEditIcoPage());
  const location = yield select(makeSelectLocation());
  const isAnalysing = location.pathname.includes('/analyse-icopass/');
  const conditionalRequiredFields = isAnalysing ? [] : ['cfr', 'icoPrice'];

  const requiredFields = [
    'icoName',
    'tokenContractAddress',
    'acceptedT&C',
    ...conditionalRequiredFields,
  ];

  for (let field = 0; field < requiredFields.length; field += 1) {
    const fieldName = requiredFields[field];
    const error = analysisData.errors[fieldName];
    const value = analysisData[requiredFields[field]];

    if (!error && !value) {
      const errorMessage =
        requiredFields[field] === 'acceptedT&C'
          ? messages.acceptDisclaimer
          : messages.blankFieldErrorMessage;

      yield put(setFormDataError(requiredFields[field], errorMessage));
    }
  }
}

export function* validateAddressFields() {
  const analysisData = yield select(makeSelectEditIcoPage());
  const addressFields = [
    'ownerAddress',
    'crowdsaleAddress',
    'tokenContractAddress',
  ];

  for (let field = 0; field < addressFields.length; field += 1) {
    const fieldName = addressFields[field];
    const error = analysisData.errors[fieldName];
    const value = analysisData[addressFields[field]];

    if (!isEmpty(value) && !error && !isValidAddress(value)) {
      yield put(
        setFormDataError(
          addressFields[field],
          messages.invalidAddressErrorMessage,
        ),
      );
    } else if (isEmpty(value) && !error) {
      yield put(unsetFormDataError(addressFields[field]));
    }
  }
}

function sanitizeAnalysisRequestData(requestData) {
  const copy = { ...requestData };
  copy.metadata = { ...copy.metadata };

  copy.metadata.icoName = extractICONameFromUrl(copy.metadata.icoName);

  return copy;
}

export function* prefillEditIcoForm(action) {
  const { fields, icoDetails } = action;

  for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex += 1) {
    const field = fields[fieldIndex];
    let value = icoDetails[field];

    if (field === 'icoName') {
      value = `${ICORatingUrlPrefix}${value}`;
    }

    yield put(updateFormData(field, value));
  }
}

export function* prepareEditPage() {
  yield put(startLoader());
  const location = yield select(makeSelectLocation());
  const isAnalysing = location.pathname.includes('/analyse-icopass/');
  const passportAddress = location.pathname.split('/')[2];

  const Reader = new sdk.PassportReader(config.PROVIDER_URL);
  const passportList = yield Reader.getPassportsList(
    config.PASSPORT_FACTORY_ADDRESS,
    config.PASSPORT_FACTORY_START_BLOCK,
  );
  const exists = find(
    passportList,
    passport => `0x${passport.passportAddress}` === passportAddress,
  );

  if (exists) {
    const FactReader = new sdk.FactReader(config.PROVIDER_URL);
    FactReader.setContract(passportAddress);
    const passport = yield FactReader.getTxdata(
      config.FACT_PROVIDER_ADDRESS,
      config.FACT_KEY,
    );

    if (!passport) {
      yield call(prepareToAnalyse, passportAddress);
    } else {
      if (isAnalysing) {
        yield put(push(`/reanalyse-icopass/${passportAddress}`));
      }
      yield call(prepareToReanalyse, passport);
    }
  } else {
    // set messages
    yield put(
      addDisplayMessage(
        'invalidPassportAddress',
        messages.invalidPassportAddress,
      ),
    );

    yield put(push('/info'));
  }

  yield put(stopLoader());
  yield put(prepareToEditIcopassFinish());
}

export function* prepareToAnalyse(passportAddress) {
  yield put(setPassportAddress(passportAddress));
}

export function* prepareToReanalyse(passport) {
  if (passport) {
    const data = JSON.parse(passport);

    yield put(setIcoDetails(data));
    yield put(setCurrentIcoVersion(data.metadata.version));
    const icoDetails = {
      icoName: data.metadata.icoName,
      decimals: data.metadata.decimals,
      tokenContractAddress: data.metadata.tokenContractAddress,
      ownerAddress: data.metadata.ownerAddress,
      crowdsaleAddress: data.metadata.crowdsaleAddress,
      cfr: data.ico_info.cfr,
      icoPrice: data.ico_info.ico_price,
      icoStartDate: constructMomentFromDate(data.ico_info.ico_start_date),
      icoEndDate: constructMomentFromDate(data.ico_info.ico_end_date),
      passportAddress: data.metadata.passportAddress,
      version: data.metadata.version,
    };

    yield put(prefillEditIcopassForm(keys(icoDetails), icoDetails));
  }
}

export default function* editIcoPageSaga() {
  yield takeEvery(ANALYSE_NEW_ICO, analyseNewIco);
  yield takeEvery(REANALYSE_NEW_ICO, reanalyseNewIco);
  yield takeEvery(PREPARE_TO_EDIT_ICOPASS_START, prepareEditPage);
  yield takeEvery(PREFILL_EDIT_ICOPASS_FORM, prefillEditIcoForm);
}
