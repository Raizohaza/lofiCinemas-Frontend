
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';

const initialState = {
    User:{}
}
export const userLogin = createAsyncThunk(
  '/user/login',
  async (action) => {
    let res = await API.post('/user/login',{...action});
    console.log(res.data);
    return res.data;
  }
);


export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.User = action.payload;
      });
  },
});

export const selectUser = (state) => state.user.User;

export default UserSlice.reducer;