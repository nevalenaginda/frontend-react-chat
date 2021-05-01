import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfile } from "../../redux/action/user";

function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem("token");

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
