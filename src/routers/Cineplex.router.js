import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL"
import Cineplex from "../pages/cineplex/Cineplex";
function Cineplexrouter(props) {
  return (
    <Switch>
      <Route exact path={URL.CINEPLEX} component={(props) => (
                    <Cineplex {
                        ...props
                    } />
                )}/>
    </Switch>
  );
}

export default Cineplexrouter;