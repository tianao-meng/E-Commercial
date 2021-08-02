import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="col">
      <div className="card p-2">
        <img src={product.images[0].url} className="card-img-top" alt="logo" />
        <div className="card-body ">
          <h5 className="card-title">
            <Link className="text-secondary" to={`/product/${product._id}`}>
              {product.name}
            </Link>
          </h5>

          <div class="ratings text-warning">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-secondary reviews">
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <p class="card-text">${product.price}</p>
          <Link to={`/product/${product._id}`} className="btn btn-warning ">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
