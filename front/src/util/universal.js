/**
 * Wait for a while
 * @param {number} time  ms
 * @return {Promise<*>}
 */
export const wait = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * Is subject looks like a Promise or not
 * @param {*} subject
 * @return {boolean}
 */
export const isPromiseAlike = (subject) => {
  return typeof subject.then === 'function';
};
