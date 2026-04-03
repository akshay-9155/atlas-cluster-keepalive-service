const fs = require("fs");
const path = require("path");
const { callEndpoint } = require("./request.service");
const logger = require("../utils/logger");

const PROJECTS_PATH = path.join(__dirname, "../config/projects.json");

const loadProjects = () => {
  const data = fs.readFileSync(PROJECTS_PATH);
  return JSON.parse(data);
};

const runHealthChecks = async () => {
  logger.info("Starting health checks...");

  const projects = loadProjects();

  await Promise.allSettled(
    projects.map(async (project) => {
      try {
        if (!project.isActive) return;
        await callEndpoint(project);
      } catch (err) {
        logger.error("Health check failed", {
          project: project.name,
          error: err.message,
        });
      }
    })
  );

  logger.info("Health checks completed");
};

module.exports = { runHealthChecks };