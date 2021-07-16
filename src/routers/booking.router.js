import React from "react";
import { Route, Switch } from "react-router-dom";

import { URL } from "../constant/URL";
import BookingPage from "../components/booking/BookingPage";

function BookingRoute(props) {
  return (
    <Switch>
      <Route exact path={URL.BOOKING} component={(props) => (
                    <BookingPage {
                        ...props
                    } />
                )} />
    </Switch>
  );
}

export default BookingRoute;