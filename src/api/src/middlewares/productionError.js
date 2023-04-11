const httpStatus = require("http-status");

const productionError = (err) => {
  let statusCode, message;
  if (err.message.match(/duplicate key error/)) {
    statusCode = httpStatus.CREATED;
    message = "You are already regestered";
  } else {
    statusCode = httpStatus.CREATED;
    message = "Something went wrong :(";
  }
  return { message, statusCode };
};

module.exports = productionError;
