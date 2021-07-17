import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import movieReducer from '../features/movie/movieSlice';
import cineplexReducer from '../features/cineplex/cineplexSlice';
import cinemaReducer from '../features/cinema/cinemaSlice';
import showtimeReducer from '../features/showtime/showtimeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movie: movieReducer,
    cineplex:cineplexReducer,
    cinema:cinemaReducer,
    showtime:showtimeReducer,
  },
});
