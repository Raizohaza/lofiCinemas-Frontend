import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import RegisterPage from '../pages/auth/register'

function RegisterRoute(props) {
    return (
      <Switch>
        <Route exact path={URL.REGISTER} component={(props) => (
                      <RegisterPage/>
                  )}/>
      </Switch>
    );
  }
  
  export default RegisterRoute;