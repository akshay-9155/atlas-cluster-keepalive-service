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
      console.log(err?.error);
      console.log(err?.response);
      console.log(err?.message);
      console.log(err?.status);
      err.status = err.response?.status || err?.error?.response?.status || err.status || 500;
      throw err;
    }
  });
};

module.exports = { callEndpoint };