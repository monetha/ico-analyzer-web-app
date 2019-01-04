import { takeEvery, put, call, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import sdk from 'reputation-sdk';
import omit from 'lodash/omit';
import keys from 'lodash/keys';
import { push } from 'connected-react-router';
import convertCallbackToPromise from 'utils/convertCallbackToPromise';
import MonethaError from 'utils/MonethaError';
import isValidAddress from 'utils/isValidAddress';
import isValidDecimal from 'utils/isValidDecimal';
import isValidDateRange from 'utils/isValidDateRange';
import calcUpdatedVersion from 'utils/calcUpdatedVersion';
import constructMomentFromDate from 'utils/constructMomentFromDate';
import {
  getContractInstance,
  waitForTxToFinish,
  hasTxFailed,
} from 'utils/web3';
import { FACT_KEY, FACT_PROVIDER_ADDRESS, NETWORK } from '../App/constants';
import abi from '../../abis/development.json';
import {
  ANALYSE_NEW_ICO,
  REANALYSE_NEW_ICO,
  PREPARE_TO_EDIT_ICOPASS_START,
  PREFILL_EDIT_ICOPASS_FORM,
} from './constants';
import messages from './messages';
import { startLoader, stopLoader } from '../App/actions';
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
import makeSelectEditIcoPage, {
  selectAnalyseFormErrors,
  selectDecimals,
} from './selectors';
import {
  selectRawDetails,
  selectCurrentIcoVersion,
} from '../IcoDetailPage/selectors';
import { reanalyseFinish } from '../IcoDetailPage/actions';
import {
  setRedirectPath,
  setRedirectTimeout,
  setRedirectPageName,
} from '../RedirectHandler/actions';
import { addDisplayMessage } from '../InfoPage/actions';
import { makeSelectLocation } from '../App/selectors';

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
      decimals,
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

    // gasLimit and transaction amount
    const value = 10000000000000000;
    const gas = '3000000';
    const txFee = 100000000000;
    const tokenAddress = '0x0';

    // Using Timestamp to generate a random int id
    const orderId = Date.now();

    // Address of the current metamask account
    const accountAddress = window.web3.eth.accounts[0];

    // Start showing loader before making invoking contract methods
    yield put(startLoader());

    const paymentProcessor = getContractInstance(
      abi.PaymentProcessor.abi,
      abi.PaymentProcessor.at,
    );

    // Invoking addOrder
    const addOrderTxHash = yield convertCallbackToPromise(
      paymentProcessor.addOrder,
      orderId,
      value,
      accountAddress,
      accountAddress,
      txFee,
      tokenAddress,
      {
        gas,
      },
    );

    // Wait until addOrder transaction finishes
    const adddOrderTxBlock = yield waitForTxToFinish(addOrderTxHash);
    if (hasTxFailed(adddOrderTxBlock)) {
      throw new Error('Transaction failed');
    }

    // Invoking securePay
    const securePayTxHash = yield convertCallbackToPromise(
      paymentProcessor.securePay,
      orderId,
      {
        value,
        gas,
      },
    );

    const url = 'https://lambda.monetha.io/ico-analyzer';
    const data = {
      ...requestData,
      metadata: {
        ...requestData.metadata,
        txHash: securePayTxHash,
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

    yield put(stopLoader());
    yield put(setRedirectPath('/'));
    yield put(setRedirectTimeout(15));
    yield put(setRedirectPageName('ICO List Page'));

    // set messages
    yield put(addDisplayMessage(messages.analyseSuccess));

    yield put(push('/info'));
  } catch (err) {
    const error = new MonethaError(err);
    yield put(setFormSumbissionError(error.formattedMessage));
    yield put(stopLoader());
  }
}

export function* reanalyseNewIco() {
  // TODO: add flow for reanalyse new passport.
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
  // yield call(validateIcoName);
  yield call(validateRequiredFields);
  yield call(validateDecimalsFields);
  yield call(validateAddressFields);
}

export function* validateIcoName() {
  const { icoName } = yield select(makeSelectEditIcoPage);
  const url = `https://icorating.com/ico/${icoName}`;

  const res = yield axios.get(url);
  if (res.status === 404) {
    yield put(setFormDataError('icoName', messages.invalidIcoNameErrorMessage));
  }
}

export function* validateDecimalsFields() {
  const decimals = yield select(selectDecimals);

  if (decimals && !isValidDecimal(decimals)) {
    yield put(
      setFormDataError('decimals', messages.invalidDecimalsErrorMessage),
    );
  }
}

export function* validateRequiredFields() {
  const formData = yield select(makeSelectEditIcoPage());
  const location = yield select(makeSelectLocation());
  const isAnalysing = location.pathname.includes('/analyse-icopass/');
  const conditionalRequiredFields = isAnalysing ? [] : ['cfr', 'icoPrice'];

  const requiredFields = [
    'icoName',
    'tokenContractAddress',
    'ownerAddress',
    'acceptedT&C',
    ...conditionalRequiredFields,
  ];

  for (let field = 0; field < requiredFields.length; field += 1) {
    const fieldName = requiredFields[field];
    const error = formData.errors[fieldName];
    const value = formData[requiredFields[field]];

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
  const formData = yield select(makeSelectEditIcoPage());
  const requiredFields = ['ownerAddress'];
  const addressFields = [
    'ownerAddress',
    'crowdsaleAddress',
    'tokenContractAddress',
  ];

  for (let field = 0; field < addressFields.length; field += 1) {
    const fieldName = addressFields[field];
    const error = formData.errors[fieldName];
    const value = formData[addressFields[field]];

    if (!isEmpty(value) && !error && !isValidAddress(value)) {
      yield put(
        setFormDataError(
          addressFields[field],
          messages.invalidAddressErrorMessage,
        ),
      );
    } else if (error && !requiredFields[addressFields[field]] && value) {
      yield put(unsetFormDataError(addressFields[field]));
    }
  }
}

export function* prefillEditIcoForm(action) {
  const { fields, icoDetails } = action;

  for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex += 1) {
    yield put(
      updateFormData(fields[fieldIndex], icoDetails[fields[fieldIndex]]),
    );
  }
}

export function* prepareEditPage() {
  yield put(startLoader());
  const location = yield select(makeSelectLocation());
  const isAnalysing = location.pathname.includes('/analyse-icopass/');
  const passportAddress = location.pathname.split('/')[2];

  if (isAnalysing) {
    yield call(prepareToAnalyse, passportAddress);
  } else {
    yield call(prepareToReanalyse, passportAddress);
  }

  yield put(stopLoader());
  yield put(prepareToEditIcopassFinish());
}

export function* prepareToAnalyse(passportAddress) {
  yield put(setPassportAddress(passportAddress));
}

export function* prepareToReanalyse(passportAddress) {
  const FactReader = new sdk.FactReader(passportAddress, NETWORK);
  const passport = yield FactReader.getString(FACT_PROVIDER_ADDRESS, FACT_KEY);

  if (passport.res !== null) {
    const data = JSON.parse(passport.res);

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
