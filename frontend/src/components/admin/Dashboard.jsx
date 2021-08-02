import React, { useState, useEffect } from "react";
import { adminProductsAction } from "../../actions/productActions";
import { adminOrdersAction } from "../../actions/orderActions";
import { allUsersAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import Loader from "../layouts/Loader";
const Dashboard = () => {
  const {  loading:productLoading ,error, products } = useSelector((state) => state.products);
  const {  loading:orderLoading ,error:orderError, orders,totalAmount } = useSelector((state) => state.adminOrders);
  const {  loading:userLoading ,error:userError, users } = useSelector((state) => state.allUsers);
  let numOutOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      numOutOfStock++;
    }
  });
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (orderError){
      alert.error(orderError);
    }
    if(userError){
      alert.error(userError);
    }
    dispatch(adminProductsAction());
    dispatch(adminOrdersAction());
    dispatch(allUsersAction());
  }, [dispatch, error,orderError,userError]);
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-12 col-md-3">
          <SideBar />
        </div>
        {(productLoading && orderLoading && userLoading) ? <Loader/> : (
            <div className="col-12 col-md-9 p-2 dashboard">
            <h1>Dashboard</h1>
            <div className="totalAmountCard">
              <h2>Total Amount</h2>
              <h3>${totalAmount}</h3>
            </div>

            <div className="card-group">
              <div className="smallCard green">
                <div className="content">
                  <h3>Products</h3>
                  <h4>{products.length}</h4>
                </div>
                <div className="details d-flex align-items-center justify-content-between">
                  <Link to="/admin/products">View Details</Link>
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
              <div className="smallCard red">
                <div className="content">
                  <h3>Orders</h3>
                  <h4 >{orders.length}</h4>
                </div>

                <div className="details d-flex align-items-center justify-content-between">
                  <Link to="/admin/orders">View Details</Link>
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
              <div className="smallCard blue">
                <div className="content">
                  <h3>Users</h3>
                  <h4>{users.length}</h4>
                </div>

                <div className="details d-flex align-items-center justify-content-between">
                  <Link to="/admin/users">View Details</Link>
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
              <div className="smallCard yellow">
                <div className="content">
                  <h3>Out Of Stock</h3>
                  <h4>{numOutOfStock}</h4>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
