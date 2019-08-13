/**
 * cbToPromise is a helper function that executes callback invoking function and returns a promise that
 * gets resolves as soon as the callback function gets invoked.
 */
export const cbToPromise = async fnExecutor =>
  new Promise((resolve, reject) => {
    const callback = (err, res) => {
      let finalErr = (res && res.error) || err;

      if (finalErr) {
        if (typeof finalErr === 'string') {
          finalErr = new Error(finalErr);
        }

        reject(finalErr);
      } else {
        if (!res) {
          resolve(res);
          return;
        }

        if (res.hasOwnProperty('result')) {
          resolve(res.result);
          return;
        }

        resolve(res);
      }
    };

    fnExecutor(callback);
  });
