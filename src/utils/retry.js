const pRetry = require("p-retry").default;

const retry = async (fn, retries = 2) => {
  return pRetry(fn, {
    retries,
    minTimeout: 2000,
    maxTimeout: 5000,
    factor: 2,
    onFailedAttempt: error => {
      const status = error.status;
      console.log(
        `Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`
      );
      if (status === 429) {
        throw new pRetry.AbortError("Rate limited");
      }
    },
  });
};

module.exports = retry;