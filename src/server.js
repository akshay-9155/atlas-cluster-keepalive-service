require("dotenv").config();
const express = require("express");
const { runHealthChecks } = require("./services/cron.service.js");
const { sleep } = require("./utils/helper.js");

const app = express();

app.get("/", (req, res) => {
  res.send("Cron service running");
});

app.get("/run", async (req, res) => {
  try {
    const token = req.headers["x-cron-secret"];

    if (token !== process.env.CRON_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log("Received cron trigger");
    await sleep(3000);
    await runHealthChecks();
    res.send("Triggered");
  } catch (error) {
    console.error("Error occurred while running health checks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;

app
  .listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1); // fail fast
  });
