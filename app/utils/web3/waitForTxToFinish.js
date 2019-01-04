import convertCallbackToPromise from '../convertCallbackToPromise';

/**
 * waitForTxToFinish waits for transaction to finish for the given txHash,
 * returns a promise which is resolved when transaction finishes.
 * @param {string} txHash a string with transaction hash as value
 */
export const waitForTxToFinish = txHash =>
  new Promise((resolve, reject) => {
    let result;
    const timeInterval = setInterval(async () => {
      try {
        result = await convertCallbackToPromise(
          window.web3.eth.getTransactionReceipt,
          txHash,
        );
      } catch (err) {
        clearInterval(timeInterval);
        reject(err);
      }
      if (result) {
        clearInterval(timeInterval);
        resolve(result);
      }
    }, 1000);
  });
