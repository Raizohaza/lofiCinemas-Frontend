import React from 'react';
import { Route, Switch } from "react-router-dom";

import Routers from './routers';
import Profile from '../components/profile/Profile';

function RouteProfile(props) {
  return (
    <Switch>
      <Route exact path={Routers.profile} component={() => <Profile/>} />
    </Switch>
  );
}

export default RouteProfile;