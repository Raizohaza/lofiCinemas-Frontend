import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import Header from "../pages/header/header"
import HomeRoute from "./home.router";
import DetailRoute from "./detail.router";
import LoginRoute from "./login.router";







function Routers() {
  return (
    <Router>
      <Header/>
      <HomeRoute/>
      <DetailRoute/>
      <LoginRoute/>
    </Router>
  );
}

export default Routers;