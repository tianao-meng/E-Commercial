import React, { useState, useEffect } from "react";
import { updateOrderAction,orderDetailsAction } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import {UPDATE_ORDER_RESET} from "../../constants/orderConstants"

import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const UpdateOrder = ({ match }) => {

    const [status, setStatus] = useState("Processing");
    const { loading, error, order } = useSelector((state) => state.orderDetails);
    const { loading:updateLoading, error:updateError, isUpdated } = useSelector((state) => state.order);
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
      if (error) {
        alert.error(error);
      }
      if (updateError){
        alert.error(updateError);
      }

      if (isUpdated) {
        alert.success('Order updated successfully');
        dispatch({ type: UPDATE_ORDER_RESET })
      }
      dispatch(orderDetailsAction(match.params.id))
    }, [dispatch, error,isUpdated,updateError]);

    function handleClick(id) {
        dispatch(updateOrderAction(id, {status}));
    }
    return (
        <div className="admin-products updateOrder">
            <MetaData title="Update Orders" />
            <div className="row">
                <div className="col-12 col-md-3">
                    <SideBar />
                </div>
    
                <div className="col-12 col-md-9 p-2 products-table">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-10">
                                <div>
                                    <div className="row">
                                        <div className="col-12 px-sm-5">
                                            <h3 className="my-5 w-100">Order #{order._id}</h3>
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
                                            <div>
                                                <h3>Stripe ID</h3>
                                                <p className="mt-3" style={{ "text-indent": 30 }}>
                                                    
                                                    {order.paymentInfo && order.paymentInfo.id}
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
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-10 p-sm-5 ">
                                <h2>Status</h2>
                                <select class="form-select mt-3" onChange={e => setStatus(e.target.value)}>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <button className="btn btn-primary mt-4 w-100" disabled={updateLoading ? true : false} onClick={() => (handleClick(match.params.id))}>
                                    Update Status
                                </button>
                            </div>
                        </div>

                        )}
                    </div>
            </div>
        </div>
    )
}

export default UpdateOrder
