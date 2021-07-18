import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import Header from "../pages/header/header"
import HomeRoute from "./home.router";
import DetailRoute from "./detail.router";
import LoginRoute from "./login.router";
import ResetRoute from "./reset.router";
import RegisterRoute from "./register.router";
import BookingRoute from "./booking.router";
import { useLocation} from "react-router-dom";
import FixedPlugin from "../components/admin/FixedPlugin/FixedPlugin.js";
import sidebarImage from "../assets/img/sidebar-3.jpg";






function Routers() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  
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
  }, [location]);
  return (
    <>
    <div>
    <Router>
      <Header/>
      <HomeRoute/>
      <LoginRoute/>
      <ResetRoute/>
      <RegisterRoute/>
      <DetailRoute/>
      <BookingRoute/>
    </Router>
    
    </div>
    <FixedPlugin
      hasImage={hasImage}
      setHasImage={() => setHasImage(!hasImage)}
      color={color}
      setColor={(color) => setColor(color)}
      image={image}
      setImage={(image) => setImage(image)}
    />
    </>
  );
}

export default Routers;