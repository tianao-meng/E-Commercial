import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";

const OrderSuccess = () => {
  return (
    <>
      <MetaData title="Order Success" />
      <div className="text-center mt-5">
        <img
          src="./images/order_success.png"
          style={{ width: 250, height: 250 }}
          alt="order success"
        />
        <h1 className="mt-5 mb-3">Your order has been placed successfully</h1>

        <Link to="/orders/me" style={{ fontSize: 20, textDecoration: "none" }}>
          Go to Orders
        </Link>
      </div>
    </>
  );
};

export default OrderSuccess;
