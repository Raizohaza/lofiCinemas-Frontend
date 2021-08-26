
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';
const localData = localStorage.userInfo!==undefined?JSON.parse(localStorage.getItem('userInfo')).payload:undefined;
const initialState = {
    User:localData!==undefined?{
      id:localData.id,
      Email: localData.Email,
      Name: localData.Name,
      Tel: localData.Tel,      
    }:{},
    loggedIn:localData&&localData.id!==undefined? true:false,
    role:localData&&localData.Role!==undefined?localData.Role:''
}

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
      localStorage.setItem('userInfo',JSON.stringify(action));
      state.User = action;
      state.loggedIn = true;
      state.role = action.Role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        if(typeof action.payload !== 'string')
          UserSlice.caseReducers.setUser(state,action.payload.user);
        else
          console.log('login fail:',action.payload);
      })
      .addCase(userLoginFacebook.fulfilled, (state, action) => {
        if(typeof action.payload !== 'string')
          UserSlice.caseReducers.setUser(state,action.payload.user);
        else
          console.log('login fail:',action.payload);
      })
      .addCase(userLoginGoogle.fulfilled, (state, action) => {
        if(typeof action.payload !== 'string')
          UserSlice.caseReducers.setUser(state,action.payload.user);
        else
          console.log('login fail:',action.payload);
      });
  },
});

export const selectUser = (state) => state.user.User;

export const { logOut,setUser } = UserSlice.actions;

export default UserSlice.reducer;