import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import Verify from '../pages/auth/verify'

function VerifyRoute(props) {
    return (
      <Switch>
        <Route exact path={URL.VERIFY} component={(props) => (
                        <Verify/>
                  )}/>
      </Switch>
    );
  }
  
  export default VerifyRoute;