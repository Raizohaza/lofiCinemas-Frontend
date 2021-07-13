import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import DetailScreen from "../pages/detail/Detail";

function DetailRoute(props) {
  return (
    <Switch>
      <Route exact path={URL.DETAIL} component={(props) => (
                    <DetailScreen {
                        ...props
                    } />
                )} />
    </Switch>
  );
}

export default DetailRoute;