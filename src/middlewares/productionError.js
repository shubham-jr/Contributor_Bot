// const httpStatus = require("http-status");

// const productionError = (err) => {
//   console.log("here prod", err.message);
//   if (err.type === "discordError") {
//     statusCode = httpStatus.CREATED;
//     err.dcMsgObj.reply(err.err);
//   } else {
//     statusCode = httpStatus.CREATED;
//     message = "Something went wrong :(";
//   }
//   return { message, statusCode };
// };

// module.exports = productionError;

const httpStatus = require("http-status");

const productionError = (err) => {
  console.log("here prod", err.message);
  if (err.type === "discordError") {
    statusCode = httpStatus.CREATED;
    err.dcMsgObj.reply(err.err);
  } else {
    statusCode = httpStatus.CREATED;
    message = "Something went wrong :(";
  }
  return { message, statusCode };
};

module.exports = productionError;
