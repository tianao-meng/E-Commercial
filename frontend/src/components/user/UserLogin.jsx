import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUserAction } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";

const UserLogin = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
 
  const { loginUser } = bindActionCreators(
    {
      loginUser: loginUserAction,
    },
    dispatch
  );

  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (isAuthenticated) {
     
      history.push(redirect);
    }
  }, [dispatch, isAuthenticated, error, alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login" />
          <div className="loginCard">
            <h1>Login</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-1">
                <Link className="loginForgePassword" to="/password/forget">
                  <strong>Forget Password?</strong>
                </Link>
              </div>
              <button type="submit" className="btn btn-warning mt-4">
                Login
              </button>
              <div className="mt-1 newUserDiv mt-3">
                <Link className="newUser " to="/register">
                  <strong>New User?</strong>
                </Link>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UserLogin;
