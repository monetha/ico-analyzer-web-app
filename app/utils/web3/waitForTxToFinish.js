import { getWeb3 } from '../../services/web3Provider';
import { cbToPromise } from '../promise';

/**
 * waitReceipt waits for transaction to finish for the given txHash,
 * returns a promise which is resolved when transaction finishes.
 * @param {string} txHash a string with transaction hash as value
 */
export const waitForTxToFinish = async txHash => {
  const web3 = getWeb3();
  if (!web3) {
    throw new Error('web3 not present');
  }

  for (let i = 0; i < 50; i += 1) {
    const receipt = await cbToPromise(callback =>
      web3.eth.getTransactionReceipt(txHash, callback),
    );

    if (!receipt) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      continue;
    }

    return receipt;
  }

  throw new Error('Failed to get receipt after 50 retries');
};
