const log = (level, message, meta = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  if(level === "ERROR"){
    console.log(JSON.stringify(logEntry));
  }
};

module.exports = {
  info: (msg, meta) => log("INFO", msg, meta),
  error: (msg, meta) => log("ERROR", msg, meta),
};