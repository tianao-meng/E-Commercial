import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  productDetailsAction,
  clearErrorAction,
  newReviewAction,
} from "../../actions/productActions";
import MetaData from "../layouts/MetaData";

import { addToCartAction } from "../../actions/cartActions";

import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { NEW_REVIEW_RESET } from "../../constants/productContants";
import ListReviews from "../review/ListReviews";

const ProductDetails = ({ match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { productDetails } = bindActionCreators(
    { productDetails: productDetailsAction, clearError: clearErrorAction },
    dispatch
  );

  const { product, error, loading } = useSelector((state) => state.product);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
      //clearError();
    }
    if (reviewError) {
      alert.error(reviewError);
    }

    if (success) {
      alert.success("Submit Review Successfully");
      dispatch({
        type: NEW_REVIEW_RESET,
      });
    }
    productDetails(match.params.id);
  }, [dispatch, error, alert, match.params.id, reviewError, success]);

  function setUserRating() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.value = index + 1;
      const events = ["mouseover", "mouseout", "click"];
      events.forEach((event) => {
        star.addEventListener(event, setColorClass);
      });
    });

    function setColorClass(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index + 1 <= this.value) {
            star.classList.add("orange");
            setRating(this.value);
          } else {
            star.classList.remove("orange");
          }
        }
        if (e.type === "mouseover") {
          if (index + 1 <= this.value) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  function increaseQty() {
    const curVal = document.querySelector(".itemNum").innerText;
    let val = parseInt(curVal);
    if (val >= product.stock) {
      return;
    }
    val = val + 1;

    document.querySelector(".itemNum").textContent = val;
  }

  function decreaseQty() {
    const curVal = document.querySelector(".itemNum").innerText;
    let val = parseInt(curVal);
    if (val <= 1) {
      return;
    }
    val = val - 1;

    document.querySelector(".itemNum").textContent = val;
  }

  function handleAddToCart() {
    const curVal = document.querySelector(".itemNum").innerText;
    let val = parseInt(curVal);
    dispatch(addToCartAction(match.params.id, val));
    alert.success("Add to Cart Successfully");
  }

  function reviewHandler() {
    const reviewData = {
      rating,
      comment,
      productId: match.params.id,
    };

    dispatch(newReviewAction(reviewData));
  }
  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <section className="productDetails d-md-flex  justify-content-center align-items-center">
          <div>
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {product.images &&
                  product.images.map((image, index) => {
                    if (index === 0) {
                      return (
                        <div className="carousel-item active">
                          <img
                            src={image.url}
                            className="d-block w-100"
                            alt={product.name}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="carousel-item">
                          <img
                            src={image.url}
                            className="d-block w-100"
                            alt={product.name}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="details">
            <h2 className="title">{product.name}</h2>
            <p>Product # {product._id}</p>
            <hr />
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-secondary reviews">
              ({product.numOfReviews} Reviews)
            </span>
            <hr />
            <h2 className="price">${product.price}</h2>
            <button className="btn-minus bg-danger" onClick={decreaseQty}>
              -
            </button>
            <span className="itemNum">1</span>
            <button className="btn-plus bg-primary" onClick={increaseQty}>
              +
            </button>
            <button
              className="btn-cart bg-warning text-light"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <hr />
            <div className="status">
              <p>
                Status:
                {product.stock > 0 ? (
                  <strong className="text-success">In Stock</strong>
                ) : (
                  <strong className="text-danger">Out of Stock</strong>
                )}
              </p>
            </div>

            <hr />
            <div className="description">
              <h3>Description:</h3>
              <p>{product.description}</p>
            </div>
            <hr />
            <p className="seller">
              Sold by: <strong>{product.seller}</strong>
            </p>
            {isAuthenticated ? (
              <>
                {" "}
                <button
                  type="button"
                  className="btn btn-warning text-light submit mb-5"
                  data-bs-toggle="modal"
                  data-bs-target="#userReview"
                  onClick={setUserRating}
                >
                  Submit Your Review
                </button>{" "}
              </>
            ) : (
              <div class="alert alert-danger mb-5" role="alert">
                Login Firt to submit your review
              </div>
            )}

            <div
              className="modal fade"
              id="userReview"
              tabindex="-1"
              aria-labelledby="userReview"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">
                      Submit Review
                    </h2>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <ul className="review-star">
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                    <textarea
                      rows="4"
                      cols="50"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-warning text-light"
                      data-bs-dismiss="modal"
                      onClick={reviewHandler}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {product.reviews && <ListReviews reviews={product.reviews} />}
    </>
  );
};

export default ProductDetails;
