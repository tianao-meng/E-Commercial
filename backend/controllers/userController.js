const User = require("../models/user");
const ErrorWithStatusCode = require("../utilities/ErrorWithStatusCode");
const asyncErrorCatch = require("../middlewares/asyncErrorCatch");
const sendAndSetCookie = require("../utilities/sendTokenAndCookie");
const sendEmail = require("../utilities/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//const ObjectId = require("mongoose").ObjectId;
// Register a user => api/v1/register

exports.registerUser = asyncErrorCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  const avatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
  });

  sendAndSetCookie(user, 201, res);
});

// Login a user => api/v1/login
exports.loginUser = asyncErrorCatch(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user has entered email and password

  if (!email || !password) {
    return next(
      new ErrorWithStatusCode("Please provide email and password", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorWithStatusCode("Please provide correct email or password", 401)
    );
  }

  const isMatch = await user.checkPassword(password);

  if (!isMatch) {
    return next(
      new ErrorWithStatusCode("Please provide correct email or password", 401)
    );
  }
  sendAndSetCookie(user, 200, res);
});

// logout => api/v1/logout
exports.logoutUser = asyncErrorCatch(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "user log out",
    });
});

// forget password => api/v1/password/forget
exports.forgetPassword = asyncErrorCatch(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    next(new ErrorWithStatusCode("No such user given that email", 404));
  }

  const resetToken = user.getResetPasswordToken();
  //
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

  const message = `You could click below link to reset your password.
  \n\n${resetUrl}\n\nIf this is not your action, please ignore this message `;

  try {
    await sendEmail({
      email: user.email,
      subject: "E-commercial password reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `reset password link is sent to your email: ${user.email}`,
    });
  } catch (err) {
    o;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorWithStatusCode(err.message, 500));
  }
});

// reset password => api/v1/password/reset/:resetToken
exports.resetPassword = asyncErrorCatch(async (req, res, next) => {
  const resetToken = req.params.resetToken;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorWithStatusCode(
        "invalid reset token or the token has expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorWithStatusCode(
        "password is not the same as confirmPassword",
        400
      )
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: true });
  sendAndSetCookie(user, 200, res);
});

// get user profile => api/v1/me
exports.getUserProfile = asyncErrorCatch(async (req, res, next) => {
  // both id and _id work
  //Mongoose assigns each of your schemas an id virtual getter
  //by default which returns the documents _id field cast to a string
  //const user = await User.findById(req.user.id);
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    user,
  });
});

// change password => api/v1/password/change
exports.changePassword = asyncErrorCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.checkPassword(req.body.oldPassword);

  if (!isMatch) {
    return next(
      new ErrorWithStatusCode(
        "The original password you provide is not correct",
        400
      )
    );
  }
  user.password = req.body.newPassword;
  await user.save();
  sendAndSetCookie(user, 200, res);
});

//update profile => api/v1/me/update
exports.updateProfile = asyncErrorCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const profile = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    const avatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    profile.avatar = avatar;
  }

  // by default validate is false in update,
  // useFindAndModify guarantee atomic operations,
  // new : return new one
  await User.findByIdAndUpdate(req.user.id, profile, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
  });
});

// Admin routes

// get all users => api/v1/admin/users

exports.getUsers = asyncErrorCatch(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// get specific user => api/v1/admin/user/:id

exports.getUserDetails = asyncErrorCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorWithStatusCode("No such user id that you provide", 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update specific user => api/v1/admin/user/:id

exports.updateUser = asyncErrorCatch(async (req, res, next) => {
  const profile = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // by default validate is false in update,
  // useFindAndModify guarantee atomic operations,
  // new : return new one
  const user = await User.findByIdAndUpdate(req.params.id, profile, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
  });
});

//delete specific user => api/v1/admin/user/:id
exports.deleteUser = asyncErrorCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorWithStatusCode("No such user id that you provide", 404)
    );
  }
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  // or choose use remove()
  await User.deleteOne({ _id: req.params.id });

  //User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});
