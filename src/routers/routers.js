import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import {Header} from "../pages/header/header"
import HomeRoute from "./home.router";
import DetailRoute from "./detail.router";
import LoginRoute from "./login.router";
import ResetRoute from "./reset.router";
import RegisterRoute from "./register.router";
import BookingRoute from "./booking.router";
import AdminRoute from "./admin.router";
import ProfileRoute from "./profile.router";
import HistoryRoute from "./history.router";
function Routers() {  
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, []);

  return (
    <div>
    <Router>
      <LoginRoute/>
      <RegisterRoute/>
      <Header/>
      <HomeRoute/>
      <ResetRoute/>
      
      <DetailRoute/>
      <BookingRoute/>
      <AdminRoute/>
      <ProfileRoute/>
      <HistoryRoute/>
    </Router>
    </div>

  );
}

export default Routers;