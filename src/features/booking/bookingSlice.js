import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';

const initialState = {
    bookings:[],
    selectedBooking: null
}

export const addBookingAsync = createAsyncThunk(
  'booking/addBooking',
  async (action) => {
      const response = await API.post(`/booking/add`,{...action})
      return response.data;
  }
);
export const editBookingAsync = createAsyncThunk(
  'booking/addBooking',
  async (action) => {
      const response = await API.put(`/booking/`+action.id,{...action})
      return response.data;
  }
);
export const deleteBookingAsync = createAsyncThunk(
  'booking/deleteBooking',
  async (action) => {
      const response = await API.delete(`/booking/`+action.id)
      return response.data;
  }
);
export const getBookingAsync = createAsyncThunk(
  'booking/fetchBooking',
  async () => {
      const response = await API.get(`/booking/`)
      response.data.sort((a,b)=> a.id - b.id);
      console.log(response.data);
      return response.data;
  }
);
export const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    getBooking (state, action) {
      state.selectedBooking = state.bookings.find(obj => obj.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getBookingAsync.fulfilled, (state, action) => {
        state.bookings = action.payload;
      });
  },
});

export const selectBooking = (state) => state.booking.bookings;

export const { getBooking } = bookingSlice.actions;

export default bookingSlice.reducer;