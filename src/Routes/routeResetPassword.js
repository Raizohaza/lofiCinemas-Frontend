import React from 'react';
import { Route, Switch } from "react-router-dom";

import Routers from './routers';
import ResetPassword from '../components/auth/ResetPassword';

function RouteResetPassword(props) {
  return (
    <Switch>
      <Route exact path={Routers.password_reset} component={() => <ResetPassword/>} />
    </Switch>
  );
}

export default RouteResetPassword;