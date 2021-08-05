import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';
const initialState = {
    coming:[],
    movies:[],
    isLoading:false,
    isReload:false,
    hot:[],
    nowPlaying:[]
}
export const addMovieAsync = createAsyncThunk(
  'movie/addMovie',
  async (action) => {
      const response = await API.post(`/movie/add`,{...action})
      return response.data;
  }
);
export const editMovieAsync = createAsyncThunk(
  'movie/editMovie',
  async (action) => {
      await API.put(`/movie/`+action.id,{...action})
      return action;
  }
);

export const deleteMovieAsync = createAsyncThunk(
  'movie/deleteMovie',
  async (action) => {
      await API.delete(`/movie/`+action.id);
      return action.id;
  }
);

export const getMovieAsync = createAsyncThunk(
  'movie/fetchMovie',
  async () => {
      const response = await API.get(`/movies`);
      response.data.sort((a,b)=> a.id - b.id);
      return response.data;
  }
);

export const getComingMovieAsync = createAsyncThunk(
  'movie/fetchComingMovie',
  async () => {
      const response = await API.get(`/comingsoon`);
      response.data.Movie.sort((a,b)=> a.id - b.id);
      return response.data.Movie;
  }
);

export const getNowPlayingMovieAsync = createAsyncThunk(
  'movie/fetchNowPlayingMovie',
  async () => {
      const response = await API.get(`/nowplaying`);
      response.data.Movie.sort((a,b)=> a.id - b.id);
      return response.data.Movie;
  }
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    getMovie (state, action) {
      state.selectedMovie = state.movies.find(obj => obj.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(getComingMovieAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coming = action.payload;
      })
      .addCase(getNowPlayingMovieAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nowPlaying = action.payload;
      })
      .addCase(deleteMovieAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = state.movies.filter(item => item.id !== action.payload);
      })
      .addCase(editMovieAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        
        let obj = state.movies.findIndex(item => item.id == action.payload.id);
        state.movies[obj] = action.payload;
      });
  },
});

export const selectMovie = (state) => state.movie.movies;

export const { getMovie,reloadData } = movieSlice.actions;

export const reloadMovieList = () => (dispatch, getState) => {
  dispatch(getMovieAsync());
};

export default movieSlice.reducer;