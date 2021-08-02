import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { updatePasswordAction } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const PasswordChange = ({ history }) => {
  const { loading, error, isupdated } = useSelector(
    (state) => state.userUpdated
  );
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const dispatch = useDispatch();

  const alert = useAlert();

  const { updatePassword } = bindActionCreators(
    {
      updatePassword: updatePasswordAction,
    },
    dispatch
  );

  useEffect(() => {
    if (isupdated) {
      dispatch({ type: UPDATE_PASSWORD_RESET });

      alert.success("Update Password Successfully");

      history.push("/me");
    }

    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, isupdated, alert, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwords = {
      oldPassword,
      newPassword,
    };
    updatePassword(passwords);
  };

  return (
    <>
      <MetaData title="Update Password" />
      <div className="changePasswordCard">
        <h1 className="mb-5">Change Password</h1>
        <form className="changePasswordForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Old Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning mt-4"
            disabled={loading ? true : false}
          >
            Change
          </button>
        </form>
      </div>
    </>
  );
};

export default PasswordChange;
