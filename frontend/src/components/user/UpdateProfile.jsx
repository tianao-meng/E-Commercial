import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { updateUserAction, loadUserAction } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = ({ history }) => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isupdated } = useSelector(
    (state) => state.userUpdated
  );
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [previewAvatar, setpreviewAvatar] = useState(user.avatar.url);
  const [avatar, setavatar] = useState("");

  const dispatch = useDispatch();

  const alert = useAlert();

  const { updateUser, loadUser } = bindActionCreators(
    {
      updateUser: updateUserAction,
      loadUser: loadUserAction,
    },
    dispatch
  );

  useEffect(() => {
    if (isupdated) {
      loadUser();

      dispatch({ type: UPDATE_PROFILE_RESET });

      alert.success("User Update Successfully");

      history.push("/me");
    }

    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, isupdated, alert, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    formData.append("avatar", avatar);
    updateUser(formData);
  };

  const changeHandler = (e) => {
    if (e.target.name === "avatar") {
      let reader = new FileReader();
      reader.onloadend = function () {
        // console.log("reader.result", reader.result);
        setpreviewAvatar(reader.result);
        setavatar(reader.result);
      };
      //   console.log("e.target.files[0]", e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      <MetaData title="Update File" />
      <div className="updateCard">
        <h1 className="mb-5">Update File</h1>
        <form className="updateForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="name"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <strong>Avatar</strong>

            <div className="avatar-group mt-2">
              <img src={previewAvatar} alt="avatar" />

              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={changeHandler}
                  name="avatar"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-warning mt-4"
            disabled={loading ? true : false}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
