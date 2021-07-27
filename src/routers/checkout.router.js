import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import Checkout from "../pages/booking/checkout";

function CheckoutRoute(props) {
  return (
    <Switch>
      <Route exact path={URL.CHECKOUT} component={(props) => (
                    <Checkout {
                        ...props
                    } />
                )} />
    </Switch>
  );
}

export default CheckoutRoute;