import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { registerAction } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
const UserRegister = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [previewAvatar, setpreviewAvatar] = useState(
    "./images/default_avatar.jpeg"
  );
  const [avatar, setavatar] = useState("");
  const { name, email, password } = user;

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const { register } = bindActionCreators(
    {
      register: registerAction,
    },
    dispatch
  );

  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, isAuthenticated, error, alert, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    formData.append("avatar", avatar);
    register(formData);
  };

  const changeHandler = (e) => {
    if (e.target.name === "avatar") {
      let reader = new FileReader();
      reader.onloadend = function () {
        console.log("reader.result", reader.result);
        setpreviewAvatar(reader.result);
        setavatar(reader.result);
      };
      //   console.log("e.target.files[0]", e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <MetaData title="Register" />
      <div className="registerCard">
        <h1>Register</h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="name"
              className="form-control"
              onChange={changeHandler}
              name="name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              className="form-control"
              onChange={changeHandler}
              name="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              onChange={changeHandler}
              name="password"
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
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
