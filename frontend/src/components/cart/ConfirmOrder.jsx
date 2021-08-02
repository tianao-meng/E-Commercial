import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MetaData from "../layouts/MetaData";

import { saveShippingInfoAction } from "../../actions/cartActions";
import CheckSteps from "./CheckSteps";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const itemPrice = Number(
    cartItems
      .reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)
      .toFixed(2)
  );

  const shippingPrice = itemPrice > 200 ? 0 : 25;

  const taxPrice = Number((0.05 * itemPrice).toFixed(2));

  const totalPrice = (itemPrice + shippingPrice + taxPrice).toFixed(2);
  function clickHandler(e) {
    e.preventDefault();
    const data = {
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  }
  return (
    <div>
      <MetaData title="Confirm Order" />
      <CheckSteps shipping confirm />

      <div className="row mt-5">
        <div className="col-lg-8 col-sm-12">
          <div>
            <h3>Shipping Info</h3>
            <p className="mt-3" style={{ "text-indent": 30 }}>
              <h5 className="d-inline">Name:</h5> {user.name}
            </p>
            <p style={{ "text-indent": 30 }}>
              <h5 className="d-inline">Phone:</h5> {shippingInfo.phoneNo}
            </p>
            <p style={{ "text-indent": 30 }}>
              <h5 className="d-inline">Address:</h5> {shippingInfo.address},{" "}
              {shippingInfo.city}, {shippingInfo.postalCode},{" "}
              {shippingInfo.country}
            </p>
          </div>
          <hr className="mb-4" />

          <h3>Your Cart Items</h3>
          <hr className="mt-4" />
          {cartItems.map((cartItem) => (
            <>
              <div className="d-flex justify-center justify-content-between">
                <img
                  className="col-3"
                  style={{ height: 100 }}
                  src={cartItem.image}
                  alt={cartItem.name}
                />

                <Link
                  className="col-5 text-dark ms-5"
                  style={{ textDecoration: "none" }}
                  to={`/product/${cartItem.product}`}
                >
                  {cartItem.name}
                </Link>
                <span className="col-4 text-center">
                  {`${cartItem.quantity} x ${cartItem.price}`}
                </span>
              </div>
              <hr className="mt-3" />
            </>
          ))}
        </div>

        <div className="col-lg-4 col-sm-12 p-sm-0 ">
          <div className="text-start orderSummary ms-lg-5 m-sm-0 mt-sm-3">
            <div>
              <h4 style={{ "font-size": "18px" }}>Order Summary</h4>
              <hr />

              <div className="d-flex justify-content-between">
                <p>Subtotal:</p>
                <strong>${itemPrice}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <p>Shipping:</p>
                <strong>${shippingPrice}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <p>Tax:</p>
                <strong>${taxPrice}</strong>
              </div>

              <hr />
              <div className="d-flex justify-content-between">
                <p>Total:</p>
                <strong>${totalPrice}</strong>
              </div>
              <hr />
            </div>
            <button
              className="bg-warning text-light check-btn"
              onClick={clickHandler}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
