const ErrorWithStatusCode = require("../utilities/ErrorWithStatusCode");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncErrorCatch = require("../middlewares/asyncErrorCatch");
exports.authencateUser = asyncErrorCatch(async (req, res, next) => {
  //console.log(req);

  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorWithStatusCode("Please login first", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);

  req.user = user;

  next();
});

exports.authencateRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorWithStatusCode(
          `${req.user.role} cannot access this resource`,
          403
        )
      );
    }
    next();
  };
};
