import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';
const initialState = {
    cineplexes:[],
    selectedCineplex: null
}

export const addCineplexAsync = createAsyncThunk(
  'cineplex/addCineplex',
  async (action) => {
      const response = await API.post(`/cineplex/add`,{...action})
      return response.data;
  }
);
export const editCineplexAsync = createAsyncThunk(
  'cineplex/addCineplex',
  async (action) => {
      const response = await API.put(`/cineplex/`+action.id,{...action})
      return response.data;
  }
);
export const deleteCineplexAsync = createAsyncThunk(
  'cineplex/deleteCineplex',
  async (action) => {
      const response = await API.delete(`/cineplex/`+action.id,{...action})
      return response.data;
  }
);
export const getCineplexByIdAsync = createAsyncThunk(
  'cineplex/',
  async (action) => {
      const response = await API.get(`/cineplex/`+action.id,{...action})
      return response.data;
  }
);
export const getCineplexAsync = createAsyncThunk(
  'cineplex/fetchCineplex',
  async () => {
      const response = await API.get(`/cineplexes/`)
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
  },
});

export const selectCineplex = (state) => state.cineplex.cineplexes;

export const { getCineplex } = cineplexSlice.actions;

export default cineplexSlice.reducer;