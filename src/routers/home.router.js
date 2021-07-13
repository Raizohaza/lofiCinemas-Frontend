import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL"
import HomeScreen from "../pages/home/home"

function HomeRoute(props) {
  return (
    <Switch>
      <Route exact path={URL.HOME} component={(props) => (
                    <HomeScreen {
                        ...props
                    } />
                )}/>
    </Switch>
  );
}

export default HomeRoute;