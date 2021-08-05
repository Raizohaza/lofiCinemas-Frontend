import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/animate.min.css";
import "../assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../assets/css/demo.css";

import { URL } from "../constant/URL";
import AdminLayout from "../layouts/layout.js";

function AdminRoute(props) {
  return (
        <Switch>
            <Route path={URL.ADMIN} render={(props) => {
                console.log('props:',props);
                return <AdminLayout {...props} />
                }} />
        </Switch>
  );
}

export default AdminRoute;