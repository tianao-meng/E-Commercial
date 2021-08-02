import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import "../../App.css";
import { Route, Link } from "react-router-dom";
import Search from "./Search";
import { loadOutAction } from "../../actions/userActions";
import { useAlert } from "react-alert";
const Header = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { logoutUser } = bindActionCreators(
    {
      logoutUser: loadOutAction,
    },
    dispatch
  );
  const logOutHandler = () => {
    logoutUser();
    
    alert.success("Log Out Successfully");
  };
  return (
    <Fragment>
      {loading === false && (
        <nav className="navbar px-md-5">
          <div className="container">
            <Link className=" navbar-brand  col-1" to="/">
              <img src="./logo.png" alt="logo" />
            </Link>
            <Route component={Search} />
            {/* <Route component={({ history }) => <Search history={history} />} /> */}
            {/* <Route render={({ history }) => <Search history={history} />} /> */}
            {/* <Search /> */}
            {/* <div className="d-flex col-md-4 col-lg-6">
            <input
              type="text "
              className="form-control rounded-0"
              placeholder="Enter Product Name..."
            />
            <button
              className="btn text-secondary bg-warning rounded-0 ml-0"
              type="button"
            >
              <i className="fa fa-search"></i>
            </button>
          </div> */}

            <div className="d-flex align-items-center col-md-3 col-lg-2 cart">
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <span className="ms-4 me-2 text-light">Cart</span>
                <span className="num  text-dark  bg-warning">
                  {cartItems.length}
                </span>
              </Link>

              {isAuthenticated ? (
                <div className="dropdown">
                  <Link
                    className="avatar-link d-flex align-items-center ms-lg-3"
                    to="#"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      className="header-avatar"
                      src={user.avatar && user.avatar.url}
                      alt={user.name}
                    />

                    <p className="text-light mb-0 user-name ms-3">
                      {user.name}
                    </p>
                  </Link>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {user.role === "Admin" && (
                      <li>
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link to="/orders/me" className="dropdown-item">
                        Orders
                      </Link>
                    </li>

                    <li>
                      <Link to="/me" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="dropdown-item text-danger"
                        onClick={logOutHandler}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                !loading && (
                  <Link
                    to="/login"
                    className="btn text-secondary bg-warning rounded-0"
                    type="button"
                  >
                    Login
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

export default Header;
