import React, { useState, useEffect } from "react";
import { myOrdersAction } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
const ListOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(myOrdersAction());
  }, [dispatch, error]);

  function datatable() {
    const res = {
      columns: [
        {
          label: "Order Id",
          field: "orderId",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "numberOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      console.log(typeof order.orderStatus);
      res.rows.push({
        orderId: order._id,
        numberOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus && order.orderStatus === "Delivered" ? (
            <p style={{ color: "green" }}>Delivered</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link className="btn btn-primary" to={`/order/${order._id}`}>
            <i className="fas fa-eye"></i>
          </Link>
        ),
      });
    });

    return res;
  }
  return (
    <>
      <MetaData title="My Orders" />
      <h1 className="my-5">My Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MDBDataTableV5
            className="mt-5 "
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datatable()}
            searchBottom={false}
            searchTop
            striped
            bordered
          />
        </>
      )}
    </>
  );
};

export default ListOrders;
