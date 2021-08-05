
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';

const initialState = {
    User:{},
    loggedIn:false,
    role:''
}
export const userLogin = createAsyncThunk(
  '/user/login',
  async (action) => {
    let res = await API.post('/user/login',{...action});
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
        // localStorage.setItem('UID',action.payload.user.id);
        // localStorage.setItem('Email',action.payload.user.Email);
        // localStorage.setItem('Name',action.payload.user.Name);
        // localStorage.setItem('Tel',action.payload.user.Tel);
        // localStorage.setItem('Role',action.payload.user.Role);
        state.User = action.payload.user;
        state.loggedIn = true;
        state.role = action.payload.user.Role;
      });
  },
});

export const selectUser = (state) => state.user.User;

export default UserSlice.reducer;