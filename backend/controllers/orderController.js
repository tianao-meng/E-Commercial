const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const ErrorWithStatusCode = require("../utilities/ErrorWithStatusCode");
const asyncErrorCatch = require("../middlewares/asyncErrorCatch");

//create new order => api/v1/order/new
// no consider the payment status; only success payment can get here
exports.newOrder = asyncErrorCatch(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//get single order by id => api/v1/order/:id
exports.getSingleOrder = asyncErrorCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "user",
    select: "name email",
    model: User,
  });
  if (!order) {
    return next(new ErrorWithStatusCode("no such order given by this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get login user order => api/v1/orders/me
exports.meOrders = asyncErrorCatch(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    orders,
  });
});

//admin get all orders => api/v1/admin/orders
exports.allOrders = asyncErrorCatch(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//admin process(update) orders => api/v1/admin/order/:id
// from processed -> delivered and update the stock in the product collection
exports.processOrder = asyncErrorCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new ErrorWithStatusCode("This order has been delivered", 400));
  }
  order.orderItems.forEach(async (item) => {
    await updateStock(item, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    success: true,
  });
});

const updateStock = async (item, quantity) => {
  const product = await Product.findById(item.product);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};

//admin delete order by id => api/v1/admin/order/:id
exports.deleteOrder = asyncErrorCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorWithStatusCode("The oder of given id cannot be found", 404)
    );
  }

  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
  });
});
