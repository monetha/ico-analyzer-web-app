/**
 * convertCallbackToPromise is a helper function that converts takes callback
 * supported functions as the input with its arguments. It returns a promise that
 * gets resolves as soon as the callback function gets invoked.
 *
 * @param {function} cdSupportedFunc a function that supports promise but callback
 * @param  {...any} funcArgs arguments to be pass at the time of function call
 */
const convertCallbackToPromise = async (cdSupportedFunc, ...funcArgs) =>
  new Promise((resolve, reject) => {
    cdSupportedFunc(...funcArgs, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

export default convertCallbackToPromise;
