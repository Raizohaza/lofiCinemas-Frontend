import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import Profile from '../pages/profile/Profile'
import Auth from 'pages/auth/auth'
function LoginRoute(props) {
    return (
      <Switch>
        <Route exact path={URL.PROFILE} component={(props) => (
                        <Profile/>
                  )}/>
      </Switch>
    );
  }
  
  export default LoginRoute;