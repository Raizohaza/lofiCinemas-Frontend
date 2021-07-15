import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import ResetPage from '../pages/auth/ResetPassword'

function ResetRoute(props) {
    return (
      <Switch>
        <Route exact path={URL.RESETPASSWORD} component={(props) => (
                      <ResetPage/>
                  )}/>
      </Switch>
    );
  }
  
  export default ResetRoute;