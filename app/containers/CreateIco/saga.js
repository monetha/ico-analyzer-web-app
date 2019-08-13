import config from 'config';
import { push } from 'connected-react-router';
import { put, takeEvery } from 'redux-saga/effects';
import sdk from 'reputation-sdk';
import MonethaError from 'utils/MonethaError';
import { waitForTxToFinish } from 'utils/web3';
import { getWeb3 } from '../../services/web3Provider';
import {
  getCurrentAccountAddress,
  sendTransaction,
} from '../../utils/web3/walletProvider';
import { startLoader, stopLoader } from '../App/actions';
import { setPassportAddress } from '../EditIcoPage/actions';
import { createIcoPassportSuccess, setFormSumbissionError } from './actions';
import { CREATE_ICO_PASSPORT } from './constants';
import messages from './messages';

export function* createIcoPassport() {
  try {
    // Start showing loader before creating passport
    yield put(startLoader(messages.confirmPassCreationInMetamask));

    const PassportFactory = new sdk.PassportGenerator(
      getWeb3(),
      config.PASSPORT_FACTORY_ADDRESS,
    );

    const accountAddress = yield getCurrentAccountAddress();

    const rawTx = yield PassportFactory.createPassport(accountAddress);

    const txHash = yield sendTransaction(rawTx);

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
