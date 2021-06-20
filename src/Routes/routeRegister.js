import React from 'react';
import { Route, Switch } from "react-router-dom";

import Routers from './routers';
import Register from '../components/auth/Register';

function RouteRegister(props) {
  return (
    <Switch>
      <Route exact path={Routers.register} component={() => <Register/>} />
    </Switch>
  );
}

export default RouteRegister;