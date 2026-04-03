const fs = require("fs");
const path = require("path");
const { callEndpoint } = require("./request.service");
const logger = require("../utils/logger");
const { sleep } = require("../utils/helper");

const PROJECTS_PATH = path.join(__dirname, "../config/projects.json");

const loadProjects = () => {
  const data = fs.readFileSync(PROJECTS_PATH);
  return JSON.parse(data);
};

const runHealthChecks = async () => {
  logger.info("Starting health checks...");

  const projects = loadProjects();

   for (const project of projects) {
    if (!project.isActive) continue;

    try {
      await callEndpoint(project);
      await sleep(1500);
    } catch (err) {
      logger.error("Health check failed", {
        project: project.name,
        error: err.message,
      });
    }
  }

  logger.info("Health checks completed");
};

module.exports = { runHealthChecks };