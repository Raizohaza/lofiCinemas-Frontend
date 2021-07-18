import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    getMovieDetailReducer,
    postBookingShowReducer,
    getMoviesReducer,
    postBookingSeatReducer,
    postAllHistoryBookingReducer,
    postAllWaitHistoryBookingReducer,
    postAllBookedHistoryBookingReducer,
    AllcineplexsReducer,
    AllMoviesByCineplexReducer,
  } from "./reducers/movieReducer";
import { loginReducer, registerReducer } from "./reducers/authReducers";
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import movieReducer from '../features/movie/movieSlice';
import cineplexReducer from '../features/cineplex/cineplexSlice';
import cinemaReducer from '../features/cinema/cinemaSlice';
import showtimeReducer from '../features/showtime/showtimeSlice';
import bookingReducer from '../features/booking/bookingSlice';  
const reducer = combineReducers({
    getMovieDetails: getMovieDetailReducer,
    postBookingShow: postBookingShowReducer,
    postBookingSeat: postBookingSeatReducer,
    postAllHistoryBooking: postAllHistoryBookingReducer,
    postAllWaitHistoryBooking: postAllWaitHistoryBookingReducer,
    postAllBookedHistoryBooking: postAllBookedHistoryBookingReducer,
    users: loginReducer,
    register: registerReducer,
    getMovies: getMoviesReducer,
    AllCineplex: AllcineplexsReducer,
    AllMoviesByCineplex: AllMoviesByCineplexReducer,
    counter: counterReducer,
    movie: movieReducer,
    cineplex:cineplexReducer,
    cinema:cinemaReducer,
    showtime:showtimeReducer,
    booking:bookingReducer,
  });
  const middleware = [thunk];
  const userLocalStorage = sessionStorage.getItem("users") ? JSON.parse(sessionStorage.getItem("users")) : [];
  const users = userLocalStorage !== [] ? userLocalStorage : { loggedIn: false };
  const INITIAL_STATE = {
    users: users,
  };
  const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));
  
  export default store;