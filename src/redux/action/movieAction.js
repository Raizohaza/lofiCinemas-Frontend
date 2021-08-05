import * as actionTypes from "../constant/movieConstant";
import axios from "../configAxios";

export const getMovies = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_MOVIES_REQUEST });
    const { data } = await axios.get("/nowplaying");
    dispatch({
      type: actionTypes.GET_MOVIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MOVIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getMoviesComingSoon = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_MOVIES_REQUEST });
    const { data } = await axios.get("/comingSoon");
    dispatch({
      type: actionTypes.GET_MOVIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MOVIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMovieDetails = (id_movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.GET_MOVIE_DETAILS_REQUEST });
    const { data } = await axios.get(`/movie/${id_movie}`);
    dispatch({
      type: actionTypes.GET_MOVIE_DETAILS_SUCCESS,
      payload: data,
    });
    sessionStorage.setItem(
      "movies",
      JSON.stringify(getState().getMovieDetails.movies)
    );
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MOVIE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postBookingShow = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_BOOKING_REQUEST });
    const { data } = await axios.post("/booking/now-showing", {
      id_movie: id,
    });
    dispatch({
      type: actionTypes.GET_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_BOOKING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postBookingSeat = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_MOVIE_DETAILS_REQUEST });
    const id_schedule = JSON.parse(sessionStorage.getItem("time"));
    const { data } = await axios.post(`booking/seat`, {
      id_schedule: id_schedule.id_schedule,
    });
    dispatch({
      type: actionTypes.GET_MOVIE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MOVIE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const checkoutCart = (total, seat) => async (dispatch, getState) => {
  const users = getState().users;
  try {
    dispatch({ type: actionTypes.CHECK_OUT_REQUEST });
    const id_schedule = JSON.parse(sessionStorage.getItem("time"));
    const { data } = await axios.post(`/payment`, {
      email: users.user.email,
      id_schedule: id_schedule.id_schedule,
      total: total,
      seat: seat,
    });
    console.log(`🚀 => file: movieActions.js => line 85 => data`, data);
    if (data.message === "success") {
      alert("Payment success👏");
    }
    dispatch({
      type: actionTypes.CHECK_OUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CHECK_OUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postAllHistoryBooking = () => async (dispatch, getState) => {
  const users = getState().users;
  try {
    dispatch({ type: actionTypes.GET_HISTORY_REQUEST });
    const { data } = await axios.post(`/allhistorybooking`, {
      email: users.user.email,
    });
    dispatch({
      type: actionTypes.GET_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postAllWaitHistoryBooking = () => async (dispatch, getState) => {
  const users = getState().users;
  try {
    dispatch({ type: actionTypes.GET_WAITTING_HISTORY_REQUEST });
    const { data } = await axios.post(`/waittinghistorybooking`, {
      email: users.user.email,
    });
    dispatch({
      type: actionTypes.GET_WAITTING_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_WAITTING_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postAllBookedHistoryBooking = () => async (dispatch, getState) => {
  const users = getState().users;
  try {
    dispatch({ type: actionTypes.GET_BOOKED_HISTORY_REQUEST });
    const { data } = await axios.post(`/bookedhistorybooking`, {
      email: users.user.email,
    });
    dispatch({
      type: actionTypes.GET_BOOKED_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_BOOKED_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllCineplex = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CINEPLEX_REQUEST });
    const { data } = await axios.get(`/allcineplexs`);
    dispatch({
      type: actionTypes.GET_CINEPLEX_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CINEPLEX_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postAllMoviesByCineplex = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_AllMoviesByCineplex_REQUEST });
    const { data } = await axios.post(`/allmoviesbycineplexid`, {
      id_cineplex: id,
    });
    dispatch({
      type: actionTypes.GET_AllMoviesByCineplex_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_AllMoviesByCineplex_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};