
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';

const initialState = {
    User:{
      id:localStorage.UID,
      Email: localStorage.Email,
      Name: localStorage.Name,
      Tel: localStorage.Tel,      
    }||{},
    loggedIn:localStorage.UID? true:false,
    role:localStorage.Role||''
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
      console.log(action);
      localStorage.setItem('UID',action.id);
      localStorage.setItem('Email',action.Email);
      localStorage.setItem('Name',action.Name);
      localStorage.setItem('Tel',action.Tel);
      localStorage.setItem('Role',action.Role);
      state.User = action;
      state.loggedIn = true;
      state.role = action.Role;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        UserSlice.caseReducers.setUser(state,action.payload.user);
      })
      .addCase(userLoginFacebook.fulfilled, (state, action) => {
        UserSlice.caseReducers.setUser(state,action.payload.user);
      })
      .addCase(userLoginGoogle.fulfilled, (state, action) => {
        UserSlice.caseReducers.setUser(state,action.payload.user);
      });
  },
});

export const selectUser = (state) => state.user.User;

export const { logOut,setUser } = UserSlice.actions;

export default UserSlice.reducer;