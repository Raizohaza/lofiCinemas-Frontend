import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';
const initialState = {
    cineplexes:[],
    isLoading: false
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
      await API.put(`/cineplex/`+action.id,{...action})
      return action;
  }
);
export const deleteCineplexAsync = createAsyncThunk(
  'cineplex/deleteCineplex',
  async (action) => {
      await API.delete(`/cineplex/`+action.id)
      return action.id;
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
      .addCase(deleteCineplexAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cineplexes = state.cineplexes.filter(item => item.id !== action.payload);
      })
      .addCase(editCineplexAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        let obj = state.cineplexes.findIndex(item => item.id === parseInt(action.payload.id));
        state.cineplexes[obj] = action.payload;
      });
  },
});

export const selectCineplex = (state) => state.cineplex.cineplexes;

export const { getCineplex } = cineplexSlice.actions;

export default cineplexSlice.reducer;