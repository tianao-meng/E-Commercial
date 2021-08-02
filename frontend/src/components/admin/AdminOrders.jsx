import React, { useState, useEffect } from "react";
import { adminOrdersAction,deleteOrderAction } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";


const AdminOrders = () => {
    const { loading, error, orders } = useSelector((state) => state.adminOrders);
    const {error:deleteError, isDeleted}= useSelector((state) => state.order);

    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
      if (error) {
        alert.error(error);
      }
      if (deleteError){
        alert.error(deleteError);
      }
      if(isDeleted){
        alert.success("Delete order successfully");
        dispatch({ type: DELETE_ORDER_RESET});
      }
      dispatch(adminOrdersAction());
    }, [dispatch, error,deleteError, isDeleted]);

    function deleteHandler(id) {
        dispatch(deleteOrderAction(id));
    }
  
    function datatable() {
      const res = {
        columns: [
          {
            label: "Order ID",
            field: "orderId",
            sort: "asc",
          },
          {
            label: "No of Items",
            field: "noOfItems",
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
        res.rows.push({
            orderId: order._id,
            noOfItems: order.orderItems.length,
            amount: `$${order.totalPrice}`,
            status:
            order.orderStatus && order.orderStatus === "Delivered" ? (
              <p style={{ color: "green" }}>Delivered</p>
            ) : (
              <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
          actions: (
            <>
              <div className="d-flex">
                <Link
                  className="btn btn-primary me-2"
                  to={`/admin/order/${order._id}`}
                >
                  <i class="fas fa-pencil-alt"></i>
                </Link>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => deleteHandler(order._id)}
                  
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </>
          ),
        });
      });
  
      return res;
    }
    return (
        <div className="admin-products">
        <MetaData title="Admin Orders" />
        <div className="row">
          <div className="col-12 col-md-3">
            <SideBar />
          </div>
  
          <div className="col-12 col-md-9 p-2 products-table">
            <h1 className="my-5">Admin Orders</h1>
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="table">
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
}

export default AdminOrders
