import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, ...rest }) {
  const isLogin = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Redirect to="/chat" /> : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;
