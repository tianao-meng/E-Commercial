import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductsAction } from "../actions/productActions";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [curPage, setcurPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];
  const alert = useAlert();
  const { products, loading, error, productCount, productPerPage } =
    useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { getProducts } = bindActionCreators(
    { getProducts: getProductsAction },
    dispatch
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    // if (curPage > 1) {
    //   setcurPage(1);
    // }
    // every time we call a action will rerender this
    getProducts(curPage, match.params.keyword, price, category, rating);
  }, [dispatch, error, curPage, match.params.keyword, price, category, rating]);

  function handlePageChange(pageNumber) {
    setcurPage(pageNumber);
  }

  return (
    <>
      <MetaData title="Home Page" />
      {loading ? (
        <Loader />
      ) : (
        <section className="products mt-5 mb-5 px-5">
          <h1 className="mb-5">Latest Products</h1>
          {match.params.keyword ? (
            <div className="slider-flex">
              <div className="slider">
                <Range
                  min={1}
                  max={1000}
                  marks={{
                    1: "$1",
                    1000: "$1000",
                  }}
                  tipFormatter={(value) => `$${value}`}
                  tipProps={{
                    placement: "top",
                    visible: true,
                  }}
                  value={price}
                  onChange={(value) => {
                    setPrice(value);
                  }}
                />
                <hr className="mt-5" />
                <h4>Categories</h4>
                <ul className="p-0 categories">
                  {categories.map((category) => (
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={(handleCategory) => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>

                <hr className="mt-5" />
                <h4>Ratings</h4>
                <ul className="p-0 ratings">
                  {[5, 4, 3, 2, 1, 0].map((rating) => (
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={(handleRating) => setRating(rating)}
                    >
                      <div className="rating-outer">
                        <div
                          className="rating-inner"
                          style={{ width: `${(rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="slider-products row row-cols-2 g-3">
                {products &&
                  products.map((product) => <Product product={product} />)}
              </div>
            </div>
          ) : (
            <div className="row row-cols-md-3 g-3 row-cols-1">
              {products &&
                products.map((product) => <Product product={product} />)}
            </div>
          )}

          {productPerPage < productCount && (
            <Pagination
              activePage={curPage}
              itemsCountPerPage={productPerPage}
              totalItemsCount={productCount}
              pageRangeDisplayed={5}
              onChange={handlePageChange} // pass pageNumber by default
              prevPageText="Prev"
              nextPageText="Next"
              firstPageText="First"
              lastPageText="Last"
              innerClass="d-flex justify-content-center pagination  mt-5" //ul
              itemClass="page-item" //li
              activeClass="page-item active" //li active
              linkClass="page-link text-secondary" // a
              activeLinkClass="text-light border-0 bg-warning" // a active
            />
          )}
        </section>
      )}
    </>
  );
};

export default Home;
