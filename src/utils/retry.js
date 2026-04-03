const pRetry = require("p-retry").default;

const retry = async (fn, retries = 3) => {
  return pRetry(fn, {
    retries,
    onFailedAttempt: error => {
      console.log(
        `Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`
      );
    },
  });
};

module.exports = retry;