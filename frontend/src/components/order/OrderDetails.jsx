import React, { useState, useEffect } from "react";
import { orderDetailsAction } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

import { Link } from "react-router-dom";

const OrderDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  useEffect(() => {
    dispatch(orderDetailsAction(match.params.id));
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error]);
  return (
    <div>
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">Order #{order._id}</h1>
          <div>
            <h3>Shipping Info</h3>
            <p className="mt-3" style={{ "text-indent": 30 }}>
              <h5 className="d-inline">Name:</h5>{" "}
              {order.user && order.user.name}
            </p>
            <p style={{ "text-indent": 30 }}>
              <h5 className="d-inline">Phone:</h5>{" "}
              {order.shippingInfo && order.shippingInfo.phoneNo}
            </p>
            <p style={{ "text-indent": 30 }}>
              <h5 className="d-inline">Address:</h5>{" "}
              {order.shippingInfo && order.shippingInfo.address},{" "}
              {order.shippingInfo && order.shippingInfo.city},{" "}
              {order.shippingInfo && order.shippingInfo.postalCode},{" "}
              {order.shippingInfo && order.shippingInfo.country}
            </p>
            <p style={{ "text-indent": 30 }}>
              <h5 className="d-inline">Amount:</h5> ${order.totalPrice}
            </p>
          </div>
          <hr />
          <div>
            <h3>Payment</h3>
            <p className="mt-3" style={{ "text-indent": 30 }}>
              <h5
                className={
                  order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "text-success"
                    : "text-danger"
                }
              >
                {order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </h5>
            </p>
            <h3>Order Status</h3>
            <p className="mt-3" style={{ "text-indent": 30 }}>
              <h5>
                {order.orderStatus && order.orderStatus === "Delivered" ? (
                  <p className="text-success">Delivered</p>
                ) : (
                  <p className="text-danger">{order.orderStatus}</p>
                )}
              </h5>
            </p>
          </div>
          <h3>Order Items</h3>
          <hr />
          {order.orderItems &&
            order.orderItems.map((orderItem) => (
              <>
                <div className="d-flex justify-center justify-content-between">
                  <img
                    className="col-3"
                    style={{ height: 100 }}
                    src={orderItem.image}
                    alt={orderItem.name}
                  />

                  <Link
                    className="col-5 text-dark ms-5"
                    style={{ textDecoration: "none" }}
                    to={`/product/${orderItem.product}`}
                  >
                    {orderItem.name}
                  </Link>
                  <span className="col-2 text-center">
                    ${`${orderItem.price}`}
                  </span>
                  <span className="col-2 text-center">
                    {`${orderItem.quantity} `} Pieces
                  </span>
                </div>
                <hr />
              </>
            ))}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
