import { takeEvery, take, put, select, call, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'connected-react-router';
import { SET_REDIRECT_TIMEOUT, CLEAR_REDIRECT_ARTIFACTS } from './constants';
import { CREATE_ICO_PASSPORT_SUCCESS } from '../CreateIco/constants';
import { addDisplayMessage, resetInfo } from '../InfoPage/actions';
import { selectRedirectTimeout, selectRedirectPath } from './selectors';
import { selectPassportAddress } from '../EditIcoPage/selectors';
import { createCustomMessages } from '../CreateIco/messages';
import {
  setRedirectPageName,
  setRedirectPath,
  setRedirectTimeout,
} from './actions';
import { RESET_INFO } from '../InfoPage/constants';

export function* handleRedirectUpdate() {
  const timeout = yield select(selectRedirectTimeout);
  const redirectPath = yield select(selectRedirectPath);

  if (redirectPath) {
    if (!timeout) {
      // redirect to mentioned redirectPath
      yield put(push(redirectPath));

      // clear redirect artifacts
      yield call(clearRedirectArtifacts);
    } else {
      yield call(delay, 1000);
      yield put(setRedirectTimeout(timeout - 1));
    }
  }
}

export function* updateInfoPageTimeoutMessage() {
  const passportAddress = yield select(selectPassportAddress);
  while (true) {
    const { timeout } = yield take(SET_REDIRECT_TIMEOUT);
    const action = addDisplayMessage(
      'createSuccess',
      createCustomMessages({ passportAddress, timeout }).createSuccess,
    );

    yield put(action);
    yield call(delay, 900);
  }
}

export function* handleRedirectionTimeoutMessage() {
  const task = yield takeEvery(
    SET_REDIRECT_TIMEOUT,
    updateInfoPageTimeoutMessage,
  );

  yield take(RESET_INFO);
  yield cancel(task);
  yield put(resetInfo());
}

export function* clearRedirectArtifacts() {
  yield put(setRedirectPageName(''));
  yield put(setRedirectPath(undefined));
}

// Individual exports for testing
export default function* redirectHandlerSaga() {
  yield takeEvery(SET_REDIRECT_TIMEOUT, handleRedirectUpdate);
  yield takeEvery(CREATE_ICO_PASSPORT_SUCCESS, handleRedirectionTimeoutMessage);
  yield takeEvery(CLEAR_REDIRECT_ARTIFACTS, clearRedirectArtifacts);
}
