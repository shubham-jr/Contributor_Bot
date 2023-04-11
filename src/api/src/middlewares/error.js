const mongoose = require("mongoose");
const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");
const config = require("../utils/config");
const logger = require("../utils/logger");
const productionError = require("./productionError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.message || err.code == 11000 ? err : httpStatus[statusCode];

    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  console.log("in error.js", config.node_env);
  if (config.node_env === "production") {
    statusCode = productionError(err).statusCode;
    message = productionError(err).message;
  }
  const response = {
    code: statusCode,
    sucess: false,
    message,
    ...(config.node_env === "development" && { stack: err.stack }),
  };

  res.locals.errorMessage = err.message;

  if (config.node_env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
