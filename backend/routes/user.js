const express = require("express");
const router = express.Router();
const {
  authencateUser,
  authencateRole,
} = require("../middlewares/authencateUser");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
var multer = require("multer");
var upload = multer();

//route for registering new user
router.route("/register").post(upload.single("avatar"), registerUser);

//route for logining in
// if get username and pathword will be in url and log
// it is more secure using post
router.route("/login").post(loginUser);

// user log out
// use get to log this action
router.route("/logout").get(logoutUser);

//forget password route
router.route("/password/forget").post(forgetPassword);

//reset password route
router.route("/password/reset/:resetToken").put(resetPassword);

//login user get their profile
router.route("/me").get(authencateUser, getUserProfile);

//change password route
router.route("/password/change").put(authencateUser, changePassword);

//change update profile
router
  .route("/me/update")
  .put(upload.single("avatar"), authencateUser, updateProfile);

// admin get all users
router
  .route("/admin/users")
  .get(authencateUser, authencateRole("Admin"), getUsers);

// admin get user detail, update user, and delete user
router
  .route("/admin/user/:id")
  .get(authencateUser, authencateRole("Admin"), getUserDetails)
  .put(authencateUser, authencateRole("Admin"), updateUser)
  .delete(authencateUser, authencateRole("Admin"), deleteUser);
module.exports = router;
