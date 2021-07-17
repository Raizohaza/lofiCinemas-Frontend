import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    cinemas:[],
    selectedCinema: null
}

export const addCinemaAsync = createAsyncThunk(
  'cinema/addCinema',
  async (action) => {
      const response = await axios.post(`http://localhost:5000/cinema/add`,{...action})
      return response.data;
  }
);
export const editCinemaAsync = createAsyncThunk(
  'cinema/addCinema',
  async (action) => {
      const response = await axios.put(`http://localhost:5000/cinema/`+action.id,{...action})
      return response.data;
  }
);
export const deleteCinemaAsync = createAsyncThunk(
  'cinema/deleteCinema',
  async (action) => {
      const response = await axios.delete(`http://localhost:5000/cinema/`+action.id)
      return response.data;
  }
);
export const getCinemaAsync = createAsyncThunk(
  'cinema/fetchCinema',
  async () => {
      const response = await axios.get(`http://localhost:5000/cinemas/`)
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