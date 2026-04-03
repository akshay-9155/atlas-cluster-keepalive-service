const pRetry = require("p-retry").default;

const retry = async (fn, retries = 3) => {
  return pRetry(fn, {
    retries,
    onFailedAttempt: error => {
      console.log(error);
      const status = error?.response?.status;
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