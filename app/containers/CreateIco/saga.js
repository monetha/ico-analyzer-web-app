import { takeEvery, put } from 'redux-saga/effects';
import sdk from 'reputation-sdk';
import { push } from 'connected-react-router';
import config from 'config';

import MonethaError from 'utils/MonethaError';
import convertCallbackToPromise from 'utils/convertCallbackToPromise';
import { waitForTxToFinish } from 'utils/web3';
import { CREATE_ICO_PASSPORT } from './constants';
import messages from './messages';
import { setFormSumbissionError, createIcoPassportSuccess } from './actions';
import { startLoader, stopLoader } from '../App/actions';
import { setPassportAddress } from '../EditIcoPage/actions';

export function* createIcoPassport() {
  try {
    // Start showing loader before creating passport
    yield put(startLoader(messages.confirmPassCreationInMetamask));

    const PassportFactory = new sdk.PassportGenerator(
      config.PROVIDER_URL,
      config.PASSPORT_FACTORY_ADDRESS,
    );

    const rawTx = yield PassportFactory.createPassport(
      window.web3.eth.accounts[0],
    );

    const txHash = yield convertCallbackToPromise(
      window.web3.eth.sendTransaction,
      rawTx,
    );

    // set loader message for better UI feedback
    yield put(startLoader(messages.icoLoadingMessage));
    const txReceipt = yield waitForTxToFinish(txHash);

    let passportAddress = txReceipt.logs[0].topics[1];
    passportAddress = `0x${passportAddress.slice(26)}`;

    yield put(setPassportAddress(passportAddress));
    // Stop showing loader after creating passport
    yield put(stopLoader());

    yield put(push(`/analyse-icopass/${passportAddress}`));
    yield put(createIcoPassportSuccess());
  } catch (err) {
    const error = new MonethaError(err);
    yield put(setFormSumbissionError(error.formattedMessage));
    yield put(stopLoader());
  }
}

export default function* createIcoSaga() {
  yield takeEvery(CREATE_ICO_PASSPORT, createIcoPassport);
}
