import React from 'react';
import { Route, Switch } from "react-router-dom";

import Routers from './routers';
import Login from '../components/auth/Login';

function RouteLogin(props) {
  return (
    <Switch>
      <Route exact path={Routers.login} component={() => <Login/>} />
    </Switch>
  );
}

export default RouteLogin;