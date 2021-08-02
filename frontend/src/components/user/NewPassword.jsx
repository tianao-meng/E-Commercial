import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { newPasswordAction } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import { NEW_PASSWORD_RESET } from "../../constants/userConstants";

import { useAlert } from "react-alert";

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, success } = useSelector(
    (state) => state.forgetPassword
  );

  const dispatch = useDispatch();

  const alert = useAlert();

  const { newPassword } = bindActionCreators(
    {
      newPassword: newPasswordAction,
    },
    dispatch
  );

  useEffect(() => {
    if (success) {
      alert.success("Reset Password Successfully");
      dispatch({
        type: NEW_PASSWORD_RESET,
      });
      history.push("/login");
    }

    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, success, alert, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetToken = match.params.resetToken;
    const passwords = {
      password,
      confirmPassword,
    };
    newPassword(resetToken, passwords);
  };
  return (
    <>
      <MetaData title="Reset Password" />
      <div className="resetPasswordCard">
        <h1 className="mb-5">Forget Password</h1>
        <form className="resetPasswordForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning mt-4"
            disabled={loading ? true : false}
          >
            Set Password
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPassword;
