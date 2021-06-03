/**
 * @param fn
 * @param delay
 * @returns {Function}
 */
export const debounce = (fn, delay = 250) => {
  let timeout;
  return (...args) => {
    const functionCall = () => fn.call(this, ...args);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, delay);
  };
};

/**
 * @param f: function
 * @param t: time
 * @returns {Function}
 */
export const throttle = (f, t) =>
  function (args) {
    const previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (
      previousCall === undefined || // function is being called for the first time
      this.lastCall - previousCall > t
    ) {
      // throttle time has elapsed
      f(args);
    }
  };

/**
 * @param start
 * @param end
 * @returns {*}
 */
export const randomBetween = (start, end) =>
  Math.floor(Math.random() * (end - start + 1)) + start;
