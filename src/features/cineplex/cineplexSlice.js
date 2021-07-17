import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';
const initialState = {
    cineplexes:[],
    selectedCineplex: null
}

export const addCineplexAsync = createAsyncThunk(
  'cineplex/addCineplex',
  async (action) => {
      const response = await axios.post(`http://localhost:5000/cineplex/add`,{...action})
      return response.data;
  }
);
export const editCineplexAsync = createAsyncThunk(
  'cineplex/addCineplex',
  async (action) => {
      const response = await axios.put(`http://localhost:5000/cineplex/`+action.id,{...action})
      return response.data;
  }
);
export const deleteCineplexAsync = createAsyncThunk(
  'cineplex/deleteCineplex',
  async (action) => {
      const response = await axios.delete(`http://localhost:5000/cineplex/`+action.id,{...action})
      return response.data;
  }
);
export const getCineplexByIdAsync = createAsyncThunk(
  'cineplex/',
  async (action) => {
      const response = await axios.get(`http://localhost:5000/cineplex/`+action.id,{...action})
      return response.data;
  }
);
export const getCineplexAsync = createAsyncThunk(
  'cineplex/fetchCineplex',
  async () => {
      const response = await axios.get(`http://localhost:5000/cineplexes/`)
      response.data.sort((a,b)=> a.id - b.id);
      return response.data;
  }
);


export const cineplexSlice = createSlice({
  name: 'cineplex',
  initialState: initialState,
  reducers: {
    getCineplex (state, action) {
      state.selectedCineplex = state.cineplexes.find(obj => obj.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getCineplexAsync.fulfilled, (state, action) => {
        state.cineplexes = action.payload;
      })
      .addCase(deleteCineplexAsync.fulfilled, (state, action) => {
        useDispatch(getCineplexAsync);
      })
  },
});

export const selectCineplex = (state) => state.cineplex.cineplexes;

export const { getCineplex } = cineplexSlice.actions;

export default cineplexSlice.reducer;