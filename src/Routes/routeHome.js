import React from 'react';
import { Route, Switch } from "react-router-dom";

import Routers from './routers';
import Home from '../components/home/Home';

function RouteHome(props) {
  return (
    <Switch>
        <Route exact path={Routers.home} component={() => <Home/>} />
    </Switch>
  );
}

export default RouteHome;