
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';

const initialState = {
    User:{
      id:localStorage.UID,
      Email: localStorage.Email,
      Name: localStorage.Name,
      Tel: localStorage.Tel,      
    }|{},
    loggedIn:localStorage.UID? true:false,
    role:localStorage.Role|''
}
console.log(localStorage);
export const userLogin = createAsyncThunk(
  '/user/login',
  async (action) => {
    let res = await API.post('/user/login',{...action});
    return res.data;
  }
);

export const userLoginFacebook = createAsyncThunk(
  '/user/loginFb',
  async (action) => {
    let res = await API.post('/user/auth/loginFacebook',{...action});
    return res.data;
  }
);

export const userLoginGoogle = createAsyncThunk(
  '/user/loginGg',
  async (action) => {
    let res = await API.post('/user/login',{...action});
    return res.data;
  }
);

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      state.User = {};
      state.loggedIn = false;
      state.role = '';
      localStorage.clear();
    },
    setUser: (state,action) => {
      console.log(action.payload);
      state.User = action.payload;
      state.loggedIn = true;
      state.role = action.payload;
      localStorage.setItem('UID',action.payload.id);
      localStorage.setItem('Email',action.payload.Email);
      localStorage.setItem('Name',action.payload.Name);
      localStorage.setItem('Tel',action.payload.Tel);
      localStorage.setItem('Role',action.payload.Role);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        setUser(action.payload.user);
      })
      .addCase(userLoginFacebook.fulfilled, (state, action) => {
        setUser(action.payload.user);
      })
      .addCase(userLoginGoogle.fulfilled, (state, action) => {
        setUser(action.payload.user);
      });
  },
});

export const selectUser = (state) => state.user.User;

export const { logOut,setUser } = UserSlice.actions;

export default UserSlice.reducer;