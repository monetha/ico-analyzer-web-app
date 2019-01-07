import { takeEvery, put, select, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import keys from 'lodash/keys';
import constructMomentFromDate from 'utils/constructMomentFromDate';
import sdk from 'reputation-sdk';
import config from 'config';

import {
  SET_ICO_DETAILS,
  REANALYSE_START,
  SWITCH_VERSION,
  PREPARE_DETAIL_PAGE,
} from './constants';
import { setCurrentIcoDetails, setIcoDetails } from './actions';
import { addDisplayMessage } from '../InfoPage/actions';
import messages from './messages';
import { selectRawDetails } from './selectors';
import { prefillEditIcopassForm } from '../EditIcoPage/actions';
import { startLoader, stopLoader } from '../App/actions';
import { setDetailsToDisplay } from '../IcoList/saga';

export function* saveCurrentIcoDetails(action) {
  const icoPass = {
    ...action.icoPass.metadata,
    ...action.icoPass.ico_info,
    ...action.icoPass.calculated_data,
  };

  icoPass.icoStartDate = constructMomentFromDate(
    action.icoPass.ico_info.ico_start_date,
  );
  icoPass.icoEndDate = constructMomentFromDate(
    action.icoPass.ico_info.ico_end_date,
  );
  icoPass.icoPrice = action.icoPass.ico_info.ico_price;

  yield put(setCurrentIcoDetails(icoPass));
}

export function* prepareToReanalyse(action) {
  const { icoDetails } = action;

  yield put(prefillEditIcopassForm(keys(icoDetails), icoDetails));
  yield put(push(`/reanalyse-icopass/${icoDetails.passportAddress}`));
}

export function* switchVersion(action) {
  yield put(startLoader());
  const icoDetails = yield select(selectRawDetails);
  const Reader = new sdk.PassportReader(config.PROVIDER_URL);

  const historyDetails = yield Reader.readPassportHistory(
    icoDetails.metadata.passportAddress,
  );

  const transactions = historyDetails.map(
    ({ transactionHash }) => transactionHash,
  );

  let passportDetails;

  // start fetching all required transaction details in parallel
  for (let pIndex = 0; pIndex < transactions.length; pIndex += 1) {
    const txBlock = yield Reader.getTrxData(transactions[pIndex]);
    const txDataString = txBlock.params[1].value;
    const txData = JSON.parse(hex2str(txDataString.slice(2)));

    if (txData.metadata.version === action.version) {
      passportDetails = txData;
      break;
    }
  }

  yield put(setIcoDetails(passportDetails));
  yield put(stopLoader());
}

export function* prepareDetailPage(action) {
  const { passportAddress } = action;
  try {
    yield put(startLoader());

    const FactReader = new sdk.FactReader(config.PROVIDER_URL);
    FactReader.setContract(passportAddress);
    const passport = yield FactReader.getTxDataBlockNumber(
      config.FACT_PROVIDER_ADDRESS,
      config.FACT_KEY,
    );

    if (passport.res !== null) {
      const data = JSON.parse(passport.res);
      data.ico_info.icoStartDate = constructMomentFromDate(
        data.ico_info.ico_start_date,
      );
      data.ico_info.icoEndDate = constructMomentFromDate(
        data.ico_info.ico_end_date,
      );

      yield call(setDetailsToDisplay, data);
    }

    yield put(stopLoader());
  } catch (error) {
    yield put(stopLoader());
    console.error(`Error fetching passport ${passportAddress}`);
    console.error(error);
    yield put(
      addDisplayMessage('invalidPassportAddress', {
        ...messages.invalidPassportAddress,
      }),
    );

    yield put(push('/info'));
  }
}

function hex2str(hexx) {
  const hex = hexx.toString(); // force conversion
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
export default function* icoDetailsSaga() {
  yield takeEvery(SET_ICO_DETAILS, saveCurrentIcoDetails);
  yield takeEvery(REANALYSE_START, prepareToReanalyse);
  yield takeEvery(SWITCH_VERSION, switchVersion);
  yield takeEvery(PREPARE_DETAIL_PAGE, prepareDetailPage);
}
