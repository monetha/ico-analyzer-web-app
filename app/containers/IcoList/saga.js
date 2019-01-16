import {
  takeEvery,
  put,
  select,
  call,
  fork,
  cancel,
  take,
} from 'redux-saga/effects';
import sdk from 'reputation-sdk';
import config from 'config';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import {
  FETCH_ICO_LIST_REQUEST,
  FETCH_PASSPORT_DETAILS_FOR_CURRENT_PAGE,
  NAVIGATE_ICO_DETAILS,
  ITEMS_PER_PAGE,
  FETCH_NEXT_PAGE,
} from './constants';
import {
  fetchIcoListFailure,
  fetchIcoListSuccess,
  fetchIcoListPerPageFailure,
  fetchIcoListPerPageRequest,
  fetchIcoListPerPageSuccess,
  setPassportAddresses,
  addPassportsData,
  fetchPassportDetailsForCurrentPage,
  setDoneFetchingForAllPassports,
  selectPage,
  setFetchedItemIndex,
  clearPassportsData,
} from './actions';
import { startLoader, stopLoader } from '../App/actions';
import {
  selectPassportsValue,
  selectSelectedPage,
  selectfetchedItemIndex,
} from './selectors';
import { setIcoDetails, setCurrentIcoVersion } from '../IcoDetailPage/actions';
import messages from './messages';
import { getWeb3 } from '../../services/web3Provider';

export function* fetchIcoList() {
  // Reset all passport data
  yield put(clearPassportsData());

  yield put(startLoader(messages.fetchingListDataLoaderMessage));

  const task = yield fork(performLocationAwaredPassportListFetch);
  yield take(LOCATION_CHANGE);
  yield put(stopLoader());
  yield cancel(task);
}

export function* performLocationAwaredPassportListFetch() {
  let passportAddresses;
  try {
    const Reader = new sdk.PassportReader(getWeb3(), config.PROVIDER_URL);
    const passports = yield Reader.getPassportsList(
      config.PASSPORT_FACTORY_ADDRESS,
      config.PASSPORT_FACTORY_START_BLOCK,
    );
    passportAddresses = passports.map(passport => passport.passportAddress);

    // sort addresses for newest first.
    passportAddresses.reverse();

    // storing all the passport addresses
    yield put(setPassportAddresses(passportAddresses));
    yield put(fetchIcoListSuccess());

    // start fetching passports to be shown on the selected page
    yield put(fetchPassportDetailsForCurrentPage());
  } catch (err) {
    console.error(err);
    const error = {
      message: 'Oops, something went wrong. Please try refreshing the page.',
    };
    yield put(fetchIcoListFailure(error));
  }
}

export function* fetchCurrentPagePassportDetails() {
  const task = yield fork(performLocationAwaredfetch);
  yield take(LOCATION_CHANGE);
  yield put(stopLoader());
  yield cancel(task);
}

export function* performLocationAwaredfetch() {
  try {
    // start loader before fetching details
    yield put(startLoader(messages.fetchingListDataLoaderMessage));
    yield put(fetchIcoListPerPageRequest());

    const passportAddresses = yield select(selectPassportsValue);

    const fetchedPassports = [];
    const totalPassports = passportAddresses.length;

    // start fetching all required passports in parallel
    const lastFetchedIndex = yield select(selectfetchedItemIndex);
    const startIndex = lastFetchedIndex + 1;
    let fetchedUptoIndex = startIndex;
    for (let pIndex = startIndex; pIndex < totalPassports; pIndex += 1) {
      const FactReader = new sdk.FactReader(
        getWeb3(),
        config.PROVIDER_URL,
        passportAddresses[pIndex],
      );

      let passport = yield call(
        fetchPassportByAddress,
        passportAddresses[pIndex],
        FactReader,
      );

      fetchedUptoIndex = pIndex;

      // If passport was not found - create empty entry
      if (!passport) {
        passport = {
          metadata: {
            passportAddress: passportAddresses[pIndex],
          },
        };
      }

      fetchedPassports.push(passport);

      const fetchedEnoughPassportForSelectedPage =
        fetchedPassports.length === ITEMS_PER_PAGE;
      const fetchedAllPassports =
        fetchedUptoIndex === passportAddresses.length - 1;

      if (fetchedAllPassports) {
        yield put(setDoneFetchingForAllPassports());
      }

      if (fetchedEnoughPassportForSelectedPage || fetchedAllPassports) {
        yield put(setFetchedItemIndex(pIndex));
        break;
      }
    }

    if (fetchedPassports.length) {
      yield put(addPassportsData(fetchedPassports));
    }

    // wait for all passports to be fetched
    yield put(stopLoader());
    yield put(fetchIcoListPerPageSuccess());
  } catch (error) {
    console.error(error);
    yield put(stopLoader());
    yield put(fetchIcoListPerPageFailure(error));
  }
}

export function* fetchPassportByAddress(passportAddress, factReader) {
  let passport;
  try {
    const result = yield factReader.getTxdata(
      config.FACT_PROVIDER_ADDRESS,
      config.FACT_KEY,
    );

    if (result) {
      passport = JSON.parse(result);
    }

    return passport;
  } catch (error) {
    console.error(`Error fetching passport ${passportAddress}\n`, error);
    return passport;
  }
}

export function* fetchNextPage() {
  const selectedPage = yield select(selectSelectedPage);

  yield put(selectPage(selectedPage + 1));
  yield put(fetchPassportDetailsForCurrentPage());
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
  yield takeEvery(FETCH_NEXT_PAGE, fetchNextPage);
  yield takeEvery(
    FETCH_PASSPORT_DETAILS_FOR_CURRENT_PAGE,
    fetchCurrentPagePassportDetails,
  );
}
