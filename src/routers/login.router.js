import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import LoginPage from '../pages/auth/Login'

function LoginRoute(props) {
    return (
      <Switch>
        <Route exact path={URL.LOGIN} component={(props) => (
                      <LoginPage/>
                  )}/>
      </Switch>
    );
  }
  
  export default LoginRoute;