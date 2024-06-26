const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
// const { errorHandler } = require("./middlewares/error");

let server;

server = app.listen(config.port, () => {
  logger.info(`Listening to http://127.0.0.1:${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close();
    logger.info("Server closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  // errorHandler(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM recieved");
  if (server) {
    server.close();
  }
});
