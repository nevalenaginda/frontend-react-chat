import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./module/PublicRoute";
import PrivateRoute from "./module/PrivateRoute";

// import pages
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import Chat from "../../pages/Chat";

function MainRoute() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute path="/Chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default MainRoute;
