import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import Header from "../pages/header/header"
import HomeRoute from "./home.router";
import DetailRoute from "./detail.router";
import LoginRoute from "./login.router";
import ResetRoute from "./reset.router";
import RegisterRoute from "./register.router";







function Routers() {
  return (
    <Router>
      <Header/>
      <HomeRoute/>
      <DetailRoute/>
      <LoginRoute/>
      <ResetRoute/>
      <RegisterRoute/>
    </Router>
  );
}

export default Routers;