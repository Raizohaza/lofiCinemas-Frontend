import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import HistoryBooking from '../pages/auth/history'

function HistoryRoute(props) {
  return (
    <Switch>
      <Route exact path={URL.HISTORY} component={(props)=> (
                    <HistoryBooking {
                        ...props
                    }/>
                )} />
    </Switch>
  );
}

export default HistoryRoute;