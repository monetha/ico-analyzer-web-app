import { takeEvery, put, select, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'connected-react-router';
import { SET_REDIRECT_TIMEOUT } from './constants';
import { selectRedirectTimeout, selectRedirectPath } from './selectors';
import {
  setRedirectPageName,
  setRedirectPath,
  setRedirectTimeout,
} from './actions';

export function* handleRedirectUpdate() {
  const timeout = yield select(selectRedirectTimeout);

  if (!timeout) {
    // redirect to mentioned redirectPath
    const redirectPath = yield select(selectRedirectPath);
    yield put(push(redirectPath));

    // clear redirect artifacts
    yield call(clearRedirectArtifacts);
  } else {
    yield call(delay, 1000);
    yield put(setRedirectTimeout(timeout - 1));
  }
}

export function* clearRedirectArtifacts() {
  yield put(setRedirectPageName(''));
  yield put(setRedirectPath(undefined));
}

// Individual exports for testing
export default function* redirectHandlerSaga() {
  yield takeEvery(SET_REDIRECT_TIMEOUT, handleRedirectUpdate);
}
