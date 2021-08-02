const asyncErrorCatch = require("../middlewares/asyncErrorCatch");
// const dotenv = require("dotenv");
// dotenv.config({ path: "backend/config/config.env" });
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' });
const stripe = require("stripe")(process.env.STRIPTE_SECRETE_KEY);

//Process Payment => /api/v1/payment/process
exports.processPayment = asyncErrorCatch(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

//Send Api Key => /api/v1/stripeapi
exports.sendStipeApiKey = asyncErrorCatch(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPTE_API_KEY,
  });
});
