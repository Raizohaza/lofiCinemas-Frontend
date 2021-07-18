
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    showtimes:[],
    selectedShowtime: null
}
let API = axios.create({
  baseURL: `http://localhost:5000/`||`http://lofi-cinemas.herokuapp.com/`
});
export const addShowtimeAsync = createAsyncThunk(
  'showtime/addShowtime',
  async (action) => {
      const response = await API.post(`/showtime/add`,{...action})
      return response.data;
  }
);
export const editShowtimeAsync = createAsyncThunk(
  'showtime/addShowtime',
  async (action) => {
      const response = await API.put(`/showtime/`+action.id,{...action})
      return response.data;
  }
);
export const deleteShowtimeAsync = createAsyncThunk(
  'showtime/deleteShowtime',
  async (action) => {
      const response = await API.delete(`/showtime/`+action.id)
      return response.data;
  }
);

export const getShowtimeAsync = createAsyncThunk(
  'showtime/fetchShowtime',
  async () => {
      const response = await API.get(`/showtimes/`)
      response.data.sort((a,b)=> a.id - b.id);
      console.log(response.data);
      return response.data;
  }
);


export const showtimeSlice = createSlice({
  name: 'showtime',
  initialState: initialState,
  reducers: {
    getShowtime (state, action) {
      state.selectedShowtime = state.showtimes.find(obj => obj.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShowtimeAsync.fulfilled, (state, action) => {
        state.showtimes = action.payload;
      });
  },
});

export const selectShowtime = (state) => state.showtime.showtimes;

export const { getShowtime } = showtimeSlice.actions;

export default showtimeSlice.reducer;