import { takeEvery, put } from 'redux-saga/effects';
import sdk from 'reputation-sdk';
import { push } from 'connected-react-router';

import MonethaError from 'utils/MonethaError';
import convertCallbackToPromise from 'utils/convertCallbackToPromise';
import { waitForTxToFinish } from 'utils/web3';
import abis from '../../abis/development.json';
import { CREATE_ICO_PASSPORT } from './constants';
import { createCustomMessages } from './messages';
import { setFormSumbissionError } from './actions';
import { startLoader, stopLoader } from '../App/actions';
import { NETWORK } from '../App/constants';
import { addDisplayMessage } from '../InfoPage/actions';
import { setPassportAddress } from '../EditIcoPage/actions';
import {
  setRedirectPath,
  setRedirectTimeout,
  setRedirectPageName,
} from '../RedirectHandler/actions';

export function* createIcoPassport() {
  try {
    // Start showing loader before creating passport
    yield put(startLoader());

    const PassportFactory = new sdk.PassportGenerator(
      NETWORK,
      abis.PassportFactory.at,
    );

    const rawTx = yield PassportFactory.createPassport(
      window.web3.eth.accounts[0],
    );

    const txHash = yield convertCallbackToPromise(
      window.web3.eth.sendTransaction,
      rawTx,
    );

    const txReceipt = yield waitForTxToFinish(txHash);

    let passportAddress = txReceipt.logs[0].topics[1];
    passportAddress = `0x${passportAddress.slice(26)}`;

    yield put(setPassportAddress(passportAddress));
    // Stop showing loader after creating passport
    yield put(stopLoader());

    yield put(setRedirectPath(`/analyse-icopass/${passportAddress}`));
    yield put(setRedirectTimeout(15));
    yield put(setRedirectPageName('Analyse ICO Page'));

    // set messages
    yield put(
      addDisplayMessage(createCustomMessages(passportAddress).createSuccess),
    );
    yield put(push('/info'));
  } catch (err) {
    const error = new MonethaError(err);
    yield put(setFormSumbissionError(error.formattedMessage));
    yield put(stopLoader());
  }
}

export default function* createIcoSaga() {
  yield takeEvery(CREATE_ICO_PASSPORT, createIcoPassport);
}
