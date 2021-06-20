import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import Header from '../components/header/Header';
import RouteHome from './routeHome';
import RouteLogin from './routeLogin';
import RouteRegister from './routeRegister';
import RouteResetPassword from './routeResetPassword';
import RouteProfile from './routeProfile';




function Route() {
  return (
    <Router>
        <Header/>
        <RouteHome/>
        <RouteLogin/>
        <RouteRegister/>
        <RouteResetPassword/>
    </Router>
  );
}

export default Route;