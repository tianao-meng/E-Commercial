const express = require("express");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  meOrders,
  allOrders,
  processOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  authencateUser,
  authencateRole,
} = require("../middlewares/authencateUser");

// create new order
router.route("/order/new").post(authencateUser, newOrder);

// get single order by id
router.route("/order/:id").get(authencateUser, getSingleOrder);

// create login user order
router.route("/orders/me").get(authencateUser, meOrders);

// admin get all orders
router
  .route("/admin/orders")
  .get(authencateUser, authencateRole("Admin"), allOrders);

// admin update stock and order status
router
  .route("/admin/order/:id")
  .put(authencateUser, authencateRole("Admin"), processOrder);

// admin delete order of given id
router
  .route("/admin/order/:id")
  .delete(authencateUser, authencateRole("Admin"), deleteOrder);

module.exports = router;
