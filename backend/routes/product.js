const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
var multer = require("multer");
var upload = multer();

const {
  authencateUser,
  authencateRole,
} = require("../middlewares/authencateUser");

//new product route
router
  .route("/admin/product/new")
  .post(upload.single("images"), authencateUser, authencateRole("Admin"), newProduct);

//update product
router
  .route("/admin/product/:id")
  .put(upload.single("images"),authencateUser, authencateRole("Admin"), updateProduct);

//delete product
router
  .route("/admin/product/:id")
  .delete(authencateUser, authencateRole("Admin"), deleteProduct);

//get products(admin)
router
  .route("/admin/products")
  .get(authencateUser, authencateRole("Admin"), getAdminProducts);

//get all products route
router.route("/products").get(getProducts);

router.route("/product/:id").get(getSingleProduct);

//create / update review
//router.route("/review").put(authencateUser, createReview);

//create / update review
router.route("/review").put(authencateUser, createReview);

//get all reviews of a product
router.route("/reviews").get(authencateUser, authencateRole("Admin"), getReviews);

//delete a review of a product
router.route("/reviews").delete(authencateUser, authencateRole("Admin"), deleteReview);

module.exports = router;
