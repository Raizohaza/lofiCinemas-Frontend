import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "../components/admin/NavBar/NavBar";
import Sidebar from "../components/admin/SideBar/Sidebar";
import FixedPlugin from "../components/admin/FixedPlugin/FixedPlugin.js";
import routes from "../router.js";
import sidebarImage from "../assets/img/sidebar-3.jpg";
import { EditMovieForm } from "features/movie/movie";
import { AddCineplexForm, EditCineplexForm } from "features/cineplex/cineplex";
import { AddCinemaForm, EditCinemaForm } from "features/cinema/cinema";
import { AddShowtimeForm, EditShowtimeForm } from "features/showtime/showtime";
import Dashboard from "pages/admin/dashboard";
import { MovieList } from "components/admin/movie/movieList";
import { BookingList } from "components/admin/booking/bookingList";
import { AddMovieForm } from "features/movie/movie";
import { CineplexList } from "components/admin/cineplex/cineplexList";
import { CinemaList } from "components/admin/cinema/cinemaList";
import { ShowtimeList } from "components/admin/showtime/showtimeList";
function Admin() {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const location = useLocation();
    const mainPanel = React.useRef(null);
    
    React.useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.current.scrollTop = 0;
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
        <div className="wrapper">
          <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
          <div className="main-panel" style={{overflow: 'scroll'}} ref={mainPanel}>
            <AdminNavbar />
            <div className="content">
              <Switch>
                <Route path="/admin/dashboard" component={Dashboard}/>

                <Route path="/admin/table" component={MovieList}/>
                <Route path="/admin/movie/add" component={AddMovieForm}/>
                <Route path="/admin/movie/:id/edit" component={EditMovieForm}/>

                <Route exact path="/admin/cineplex" component={CineplexList}/>
                <Route path="/admin/cineplex/add" component={AddCineplexForm}/>
                <Route path="/admin/cineplex/:id/edit" component={EditCineplexForm}/>

                <Route exact path="/admin/cinema" component={CinemaList}/>
                <Route path="/admin/cinema/add" component={AddCinemaForm}/>
                <Route path="/admin/cinema/:id/edit" component={EditCinemaForm}/>

                <Route exact path="/admin/showtime" component={ShowtimeList}/>
                <Route path="/admin/showtime/add" component={AddShowtimeForm}/>
                <Route path="/admin/showtime/:id/edit" component={EditShowtimeForm}/>

                <Route exact path="/admin/booking" component={BookingList}/>
              </Switch>
            </div>
          </div>
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
  
  export default Admin;

  // const getRoutes = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route
  //           path={prop.layout + prop.path}
  //           render={(props) => <prop.component {...props} />}
  //           key={key}
  //         />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };