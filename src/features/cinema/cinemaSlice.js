import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    cinemas:[],
    selectedCinema: null
}
let API = axios.create({
  baseURL: `http://localhost:5000/`||`http://lofi-cinemas.herokuapp.com/`
});
export const addCinemaAsync = createAsyncThunk(
  'cinema/addCinema',
  async (action) => {
      const response = await API.post(`/cinema/add`,{...action})
      return response.data;
  }
);
export const editCinemaAsync = createAsyncThunk(
  'cinema/addCinema',
  async (action) => {
      const response = await API.put(`/cinema/`+action.id,{...action})
      return response.data;
  }
);
export const deleteCinemaAsync = createAsyncThunk(
  'cinema/deleteCinema',
  async (action) => {
      const response = await API.delete(`/cinema/`+action.id)
      return response.data;
  }
);
export const getCinemaAsync = createAsyncThunk(
  'cinema/fetchCinema',
  async () => {
      const response = await API.get(`/cinemas/`)
      response.data.sort((a,b)=> a.id - b.id);
      console.log(response.data);
      return response.data;
  }
);


export const cinemaSlice = createSlice({
  name: 'cinema',
  initialState: initialState,
  reducers: {
    getCinema (state, action) {
      state.selectedCinema = state.cinemas.find(obj => obj.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getCinemaAsync.fulfilled, (state, action) => {
        state.cinemas = action.payload;
      });
  },
});

export const selectCinema = (state) => state.cinema.cinemas;

export const { getCinema } = cinemaSlice.actions;

export default cinemaSlice.reducer;