import { takeEvery, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'connected-react-router';
import copy from 'copy-to-clipboard';
import config from 'config';
import {
  ENABLE_METAMASK_REQUEST,
  ADD_TO_CLIPBOARD,
  REDIRECT,
  ACCEPT_COOKIE_POLICY,
  CHECK_COOKIE_POLICY_STATUS,
} from './constants';
import { TX_REJECTED } from '../../utils/MonethaError/constants';
import {
  enableMetamaskFailure,
  enableMetamaskSuccess,
  showCopyToClipboard,
  hideCopyToClipboard,
  setCookiePolicyStatus,
} from './actions';

export function* enableMetamask() {
  try {
    if (!window.web3) {
      throw new Error('Metamask not found');
    }

    if (!window.web3.eth.accounts.length === 0) {
      throw new Error('Current provider not found');
    }

    const [currentAddress] = yield window.web3.currentProvider.enable();

    if (currentAddress !== '') {
      yield put(enableMetamaskSuccess());
    } else {
      throw new Error(TX_REJECTED);
    }
  } catch (e) {
    yield put(enableMetamaskFailure(e));
    console.error(e);
  }
}

export function* copyToClipboard(action) {
  const clipboardId = action.clipboardId || Date.now();
  copy(action.text);
  yield put(showCopyToClipboard(clipboardId));
  yield call(delay, action.timeout);
  yield put(hideCopyToClipboard(clipboardId));
}

export function* redirectSaga(action) {
  yield put(push(action.path));
}

export function* acceptCookiePolicy() {
  try {
    localStorage.setItem(config.COOKIE_POLICY_STORAGE_KEY, true);
    yield put(setCookiePolicyStatus(true));
  } catch (error) {
    yield put(setCookiePolicyStatus(false));
  }
}

export function* checkCookiePolicyStatus() {
  const status = localStorage.getItem(config.COOKIE_POLICY_STORAGE_KEY);
  yield put(setCookiePolicyStatus(status));
}

export default function* createIcoSaga() {
  yield takeEvery(ENABLE_METAMASK_REQUEST, enableMetamask);
  yield takeEvery(ADD_TO_CLIPBOARD, copyToClipboard);
  yield takeEvery(REDIRECT, redirectSaga);
  yield takeEvery(CHECK_COOKIE_POLICY_STATUS, checkCookiePolicyStatus);
  yield takeEvery(ACCEPT_COOKIE_POLICY, acceptCookiePolicy);
}
