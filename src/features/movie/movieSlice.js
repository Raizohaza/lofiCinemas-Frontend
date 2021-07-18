import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';
const initialState = {
    movies:[],
    selectedMovie: null
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
      const response = await API.put(`/movie/`+action.id,{...action})
      return response.data;
  }
);

export const deleteMovieAsync = createAsyncThunk(
  'movie/deleteMovie',
  async (action) => {
      const response = await API.delete(`/movie/`+action.id)
      return response.data;
  }
);

export const getMovieAsync = createAsyncThunk(
  'movie/fetchMovie',
  async () => {
      const response = await API.get(`/movies/`)
      response.data.sort((a,b)=> a.id - b.id);
      console.log(response.data);
      return response.data;
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
      .addCase(getMovieAsync.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const selectMovie = (state) => state.movie.movies;

export const { getMovie } = movieSlice.actions;

export default movieSlice.reducer;