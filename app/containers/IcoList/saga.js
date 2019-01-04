import { takeEvery, put, select, fork, join, call } from 'redux-saga/effects';
import sdk from 'reputation-sdk';
import { push } from 'connected-react-router';
import {
  FETCH_ICO_LIST_REQUEST,
  FETCH_PASSPORT_DETAILS_FOR_CURRENT_PAGE,
  NAVIGATE_ICO_DETAILS,
} from './constants';
import { FACT_KEY, FACT_PROVIDER_ADDRESS, NETWORK } from '../App/constants';
import {
  fetchIcoListFailure,
  fetchIcoListSuccess,
  fetchIcoListPerPageFailure,
  fetchIcoListPerPageRequest,
  fetchIcoListPerPageSuccess,
  setPassportAddresses,
  setPassportData,
  setPassportsData,
  fetchPassportDetailsForCurrentPage,
} from './actions';
import { startLoader, stopLoader } from '../App/actions';
import abis from '../../abis/development.json';
import { selectPassportsValue } from './selectors';
import { setIcoDetails, setCurrentIcoVersion } from '../IcoDetailPage/actions';

export function* fetchIcoList() {
  let passportAddresses;
  try {
    const Reader = new sdk.PassportReader(NETWORK);
    const passports = yield Reader.getPassportLists(abis.PassportFactory.at);
    passportAddresses = passports.map(passport => passport.passportAddress);

    // sort addresses for newest first.
    passportAddresses.reverse();

    // storing all the passport addresses
    yield put(setPassportAddresses(passportAddresses));
    yield put(fetchIcoListSuccess());

    // initialize empty passports list
    yield fork(initEmptyPassports);

    // start fetching passports to be shown on the selected page
    yield put(fetchPassportDetailsForCurrentPage());
  } catch (err) {
    console.error(err);
    yield put(fetchIcoListFailure(err));
  }
}

export function* initEmptyPassports() {
  const passportAddresses = yield select(selectPassportsValue);
  const emptyPassports = passportAddresses.map(address => ({ [address]: {} }));

  yield put(setPassportsData(emptyPassports));
}

export function* fetchCurrentPagePassportDetails() {
  try {
    // start loader before fetching details
    yield put(startLoader());
    yield put(fetchIcoListPerPageRequest());

    // const selectedPage = yield select(selectSelectedPage);
    const passportAddresses = yield select(selectPassportsValue);

    // Ignoring pagination logic as not all the passport have data
    //
    // // calculating items to be fetched
    // let startIndex = selectedPage * ITEMS_PER_PAGE;
    // startIndex = startIndex ? startIndex - 1 : 0;
    // const endIndex = startIndex + ITEMS_PER_PAGE;

    // const passportsOnSelectedPage = passportAddresses.slice(
    //   startIndex,
    //   endIndex,
    // );
    // const availablePassports = yield select(selectPassportsData);
    // const passportsToBeFetched = passportAddresses.filter(
    //   passportAddress => !availablePassports[passportAddress],
    // );

    const tasks = [];

    // start fetching all required passports in parallel
    for (let pIndex = 0; pIndex < passportAddresses.length; pIndex += 1) {
      const task = yield fork(
        fetchPassportByAddress,
        passportAddresses[pIndex],
      );
      tasks.push(task);
    }

    // wait for all passports to be fetched
    yield join(...tasks);
    yield put(stopLoader());
    yield put(fetchIcoListPerPageSuccess());
  } catch (error) {
    console.error(error);
    yield put(stopLoader());
    yield put(fetchIcoListPerPageFailure(error));
  }
}

export function* fetchPassportByAddress(passportAddress) {
  try {
    const FactReader = new sdk.FactReader(passportAddress, NETWORK);
    const passport = yield FactReader.getString(
      FACT_PROVIDER_ADDRESS,
      FACT_KEY,
    );

    if (passport.res !== null) {
      const data = JSON.parse(passport.res);
      yield put(setPassportData(passportAddress, data));
    }
  } catch (error) {
    console.error(`Error fetching passport ${passportAddress}`);
    console.error(error);
  }
}

export function* setDetailsToDisplay(icoPass) {
  yield put(setIcoDetails(icoPass));
  yield put(setCurrentIcoVersion(icoPass.metadata.version));
}

export function* prepareAndNavigateToIcoDetails(action) {
  yield call(setDetailsToDisplay, action.icoPass);
  yield put(push(`/ico-list/${action.icoPass.metadata.passportAddress}`));
}

export default function* icoDetailsSaga() {
  yield takeEvery(FETCH_ICO_LIST_REQUEST, fetchIcoList);
  yield takeEvery(NAVIGATE_ICO_DETAILS, prepareAndNavigateToIcoDetails);
  yield takeEvery(
    FETCH_PASSPORT_DETAILS_FOR_CURRENT_PAGE,
    fetchCurrentPagePassportDetails,
  );
}
