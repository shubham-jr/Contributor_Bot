const { errorHandler } = require("./../middlewares/error");

module.exports = catchAsync = (fn) => {
  return (...args) => {
    return fn(...args).catch((err) => {
      console.log("catchAsync", err);
      errorHandler(err);
    });
  };
};
