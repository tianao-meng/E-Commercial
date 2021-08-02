const ErrorWithStatusCode = require("../utilities/ErrorWithStatusCode");

module.exports = (err, req, res, next) => {
  // 500 is internal error

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal error";

  if (process.env.NODE_ENV == "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      statusCode: err.statusCode,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV == "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    if (err.name === "CastError") {
      const message = `Product cannot be found, not valid ${error.path}`;
      error = new ErrorWithStatusCode(message, 400);
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((error) => error.message);
      console.log(message);
      error = new ErrorWithStatusCode(message, 400);
    }

    if (err.code === 11000) {
      const message = `Please provide a different ${Object.keys(err.keyValue)}`;
      error = new ErrorWithStatusCode(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
      const message = `Json web token is invalid`;
      error = new ErrorWithStatusCode(message, 400);
    }

    if (err.name === "TokenExpiredError") {
      const message = `Json web token is expired.`;
      error = new ErrorWithStatusCode(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
