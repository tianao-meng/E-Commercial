import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <MetaData title="User Profile" />
      <h1 className="my-5">My Profile </h1>
      <div className="userDetails">
        <div>
          <img src={user.avatar.url} alt={user.name} />
          <Link
            to="/me/update"
            className="avatar-btn btn btn-warning my-5 text-light"
          >
            Edit Profile
          </Link>
        </div>

        <div className="Details ">
          <h4>Full Name</h4>
          <p>{user.name}</p>
          <h4>Email Address</h4>
          <p>{user.email}</p>
          <h4>Joined On</h4>
          <p>{String(user.createdAt).substring(0, 10)}</p>
          <Link
            to="/orders/me"
            className="details-btn btn btn-danger  mt-5 text-light"
          >
            My Orders
          </Link>
          <Link
            to="/password/update"
            className="details-btn btn btn-primary mt-3 text-light"
          >
            Change Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
