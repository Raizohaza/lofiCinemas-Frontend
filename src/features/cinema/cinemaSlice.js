import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';

const initialState = {
    cinemas:[],
    isLoading: false
}
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
      await API.put(`/cinema/`+action.id,{...action})
      return action;
  }
);
export const deleteCinemaAsync = createAsyncThunk(
  'cinema/deleteCinema',
  async (action) => {
      await API.delete(`/cinema/`+action.id)
      return action.id;
  }
);
export const getCinemaAsync = createAsyncThunk(
  'cinema/fetchCinema',
  async () => {
      const response = await API.get(`/cinemas/`)
      response.data.sort((a,b)=> a.id - b.id);
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
      })
      .addCase(deleteCinemaAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cinemas = state.cinemas.filter(item => item.id !== action.payload);
      })
      .addCase(editCinemaAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        let obj = state.cinemas.findIndex(item => item.id === parseInt(action.payload.id));
        state.cinemas[obj] = action.payload;
      });
  },
});

export const selectCinema = (state) => state.cinema.cinemas;

export const { getCinema } = cinemaSlice.actions;

export default cinemaSlice.reducer;