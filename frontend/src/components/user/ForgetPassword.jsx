import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { forgetPasswordAction } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import { FORGET_PASSWORD_RESET } from "../../constants/userConstants";

import { useAlert } from "react-alert";

const ForgetPassword = ({ history }) => {
  const [email, setEmail] = useState();
  const { loading, error, message } = useSelector(
    (state) => state.forgetPassword
  );

  const dispatch = useDispatch();

  const alert = useAlert();

  const { forgetPassword } = bindActionCreators(
    {
      forgetPassword: forgetPasswordAction,
    },
    dispatch
  );

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({
        type: FORGET_PASSWORD_RESET,
      });
    }

    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, message, alert, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    forgetPassword({ email });
  };

  return (
    <>
      <MetaData title="Forget Password" />
      <div className="forgetPasswordCard">
        <h1 className="mb-5">Forget Password</h1>
        <form className="forgetPasswordForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Email</strong>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning mt-4"
            disabled={loading ? true : false}
          >
            Send Email
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
