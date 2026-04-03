const axios = require("axios");
const retry = require("../utils/retry");
const logger = require("../utils/logger");

const callEndpoint = async (project) => {
  return retry(async () => {
    const start = Date.now();

    const res = await axios({
      method: project.method || "GET",
      url: project.url,
      timeout: 5 * 60 * 1000, // 5 minutes
    });

    const duration = Date.now() - start;

    logger.info("Health check success", {
      project: project.name,
      status: res.status,
      returnedData: res.data.data,
      duration,
    });

    return res.data;
  });
};

module.exports = { callEndpoint };