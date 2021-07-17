import Dashboard from "./pages/admin/dashboard.js";
import Map from "./pages/admin/Maps.js";
import {MovieList} from "./components/admin/movie/movieList.js";
import {CineplexList} from "./components/admin/cineplex/cineplexList.js";
import {CinemaList} from "./components/admin/cinema/cinemaList.js";
import {ShowtimeList} from "./components/admin/showtime/showtimeList.js";
import { AddMovieForm, MovieForm, EditMovieForm } from './features/movie/movie';
const sideBarRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Movie List",
    icon: "nc-icon nc-notes",
    component: MovieList,
    layout: "/admin",
  },
  {
    path: "/movie/add",
    name: "Movie Add",
    icon: "nc-icon nc-simple-add",
    layout: "/admin",
    component:AddMovieForm,
  },
  {
    path: "/cineplex",
    name: "Cineplex List",
    icon: "nc-icon nc-bag",
    component: CineplexList,
    layout: "/admin",
  },
  {
    path: "/showtime",
    name: "Showtime List",
    icon: "nc-icon nc-layers-3",
    component: ShowtimeList,
    layout: "/admin",
  },
  {
    path: "/cinema",
    name: "Cinema List",
    icon: "nc-icon nc-tablet-2",
    component: CinemaList,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Map,
    layout: "/admin",
  },
];
// export const Routes = () => {
//   return (
//       <Router>
//         <Switch>
//           <WithLayoutRoute
//             exact
//             path="/checkin/:reservationId"
//             component={Checkin}
//             layout={PublicLayout}
//           />
//         </Switch>
//       </Router>
//   );
// }
export default sideBarRoutes;
