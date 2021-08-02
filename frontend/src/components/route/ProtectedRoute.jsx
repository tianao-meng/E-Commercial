import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => {
    return state.user;
  });

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {

            if (!isAuthenticated) {
              return <Redirect to="/login" />;
            }
            if (isAdmin && user.role !== "Admin") {
              return <Redirect to="/" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
