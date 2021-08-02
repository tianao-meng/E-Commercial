import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  function handleShow() {
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.classList.toggle("inactive");
    });
  }
  return (
    <>
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/dashboard">
              <i class="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          <li className="dropdown" onClick={handleShow}>
            <a className="dropdown-toggle">
              <i className="fab fa-product-hunt"></i> Products
            </a>
          </li>
          <li className="dropdown-item">
            <Link to="/admin/products">
              <i className="fa fa-clipboard"></i> All
            </Link>
          </li>

          <li className="dropdown-item">
            <Link to="/admin/product">
              <i className="fa fa-plus"></i> Create
            </Link>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
