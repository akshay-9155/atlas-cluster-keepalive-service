const axios = require("axios");
const http = require("http");
const https = require("https");
const retry = require("../utils/retry");
const logger = require("../utils/logger");

const axiosInstance = axios.create({
  timeout: 3 * 60 *1000,
  httpAgent: new http.Agent({ keepAlive: false }),
  httpsAgent: new https.Agent({ keepAlive: false }),
});


const callEndpoint = async (project) => {
  return retry(async () => {
    const start = Date.now();

    try {
      const res = await axiosInstance({
        method: project.method || "GET",
        url: project.url,
      });
      console.log(res);

      const duration = Date.now() - start;

      logger.info("Health check success", {
        project: project.name,
        status: res.status,
        duration,
      });

      return res.data;
    } catch (err) {
      err.status = err?.response?.status;
      throw err;
    }
  });
};

module.exports = { callEndpoint };