const express = require("express");
const router = express.Router();
const {
  processPayment,
  sendStipeApiKey,
} = require("../controllers/paymentController");
const { authencateUser } = require("../middlewares/authencateUser");

// process payment
router.route("/payment/process").post(authencateUser, processPayment);

// send Api Key
router.route("/stripeapi").get(authencateUser, sendStipeApiKey);

module.exports = router;
