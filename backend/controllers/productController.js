const Product = require("../models/product");
const ErrorWithStatusCode = require("../utilities/ErrorWithStatusCode");
const asyncErrorCatch = require("../middlewares/asyncErrorCatch");

const APIFeatures = require("../utilities/apiFeatures");
const cloudinary = require("cloudinary");
//Create new Product => /api/v1/admin/product/new (Post)
exports.newProduct = asyncErrorCatch(async (req, res, next) => {
  
  let images = []
  
  if (typeof req.body.images === "string"){

    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imagesRes =[];

  for (i = 0 ; i < images.length; i++){
    
    const res = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
      width: 150,
      crop: "scale",
    });
    imagesRes.push({
      public_id: res.public_id,
      url: res.secure_url
    });
  }
  
  req.body.images = imagesRes;
  req.body.user = req.user._id;
 
  const product = await Product.create(req.body);
  
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all products => /api/v1/products?keyword=apple (Get)
exports.getProducts = asyncErrorCatch(async (req, res, next) => {
  //return next(new ErrorWithStatusCode("textError by me", 404));
  const productPerPage = 3;
  const productCount = await Product.countDocuments();
  //console.log(productCount);
  let apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();
  const products_filtered_searched = await apiFeatures.query;

  apiFeatures = apiFeatures.pagination(productPerPage);

  const products = await apiFeatures.query;

  // setTimeout(() => {

  // }, 2000);
  res.status(200).json({
    success: true,
    productCount: products_filtered_searched.length,
    productPerPage,
    products,
  });
});

//Get certain product => /api/v1/product/:id

exports.getSingleProduct = asyncErrorCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorWithStatusCode("Cannot find the product of given id", 404)
    );
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Get all products => api/v1/admin/products

exports.getAdminProducts = asyncErrorCatch(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// update product => api/v1/admin/product/:id

exports.updateProduct = asyncErrorCatch(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorWithStatusCode("Cannot find the product of given id", 404)
    );
  }

  if(req.body.images !== undefined){
    for(let i = 0 ;i < product.images.length; i++){
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
  
    let images = []
    
    if (typeof req.body.images === "string"){
  
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    let imagesRes =[];
  
    for (i = 0 ; i < images.length; i++){
      
      const res = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
        width: 150,
        crop: "scale",
      });
      imagesRes.push({
        public_id: res.public_id,
        url: res.secure_url
      });
    }
    
    req.body.images = imagesRes;
  }


  req.body.user = req.user._id;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete product => api/v1/admin/product/:id
exports.deleteProduct = asyncErrorCatch(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorWithStatusCode("Cannot find the product of given id", 404)
    );
  }
  for(let i = 0 ;i < product.images.length; i++){
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product has been deleted",
  });
});

// create a new review / update a review => api/v1/review
exports.createReview = asyncErrorCatch(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  

  const product = await Product.findById(productId);
  const curUserReview = product.reviews.find(
    (review) => review.user.toString() === req.user.id.toString()
  );

  if (!curUserReview) {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  } else {
    curUserReview.user = review.user;
    curUserReview.name = review.name;
    curUserReview.rating = review.rating;
    curUserReview.comment = review.comment;
  }
  const reducer = (accumulator, review) => accumulator + review.rating;
  const toatalRating =
    product.reviews.reduce(reducer, 0) / product.reviews.length;
  product.ratings = toatalRating;
  product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// user get all reviews of a product => api/v1/reviews?id(productId)=...
exports.getReviews = asyncErrorCatch(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// user delete review of a product => api/v1/reviews?id(reviewId)=...&productId=...
exports.deleteReview = asyncErrorCatch(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review.id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;

  const reducer = (accumulator, review) => accumulator + review.rating;
  const ratings = reviews.reduce(reducer, 0) / reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
