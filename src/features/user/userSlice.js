
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import API from 'api';
const localData = 'userInfo' in localStorage && localStorage.userInfo!=='undefined'?JSON.parse(localStorage.getItem('userInfo')):undefined;
const initialState = {
    User:localData!==undefined?{
      id:localData.id,
      Email: localData.Email,
      Name: localData.Name,
      Tel: localData.Tel,      
    }:{},
    loggedIn:localData&&localData.id!==undefined? true:false,
    role:localData&&localData.Role!==undefined?localData.Role:'',
    notification:''
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
      state.notification = '';
      localStorage.clear();
    },
    setUser: (state,action) => {
      state.notification = '';
      localStorage.setItem('userInfo',JSON.stringify(action));
      state.User = action;
      state.loggedIn = true;
      state.role = action.Role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        if(typeof action.payload !== 'string' && typeof action.payload !== undefined && Object.keys(action.payload).length >0)
        {
          state.notification = '';  
          UserSlice.caseReducers.setUser(state,action.payload.user);
        }
        
        else{
          state.notification = 'login fail:' + action.payload;
          console.log('login fail:',action.payload);
        }
      })
      .addCase(userLoginFacebook.fulfilled, (state, action) => {
        if(typeof action.payload !== 'string' && typeof action.payload !== undefined && Object.keys(action.payload).length >0)
          UserSlice.caseReducers.setUser(state,action.payload.user);
        else{
          state.notification = 'login fail:' + action.payload;
          console.log('login fail:',action.payload);
        }
      })
      .addCase(userLoginGoogle.fulfilled, (state, action) => {
        if(typeof action.payload !== 'string' && typeof action.payload !== undefined && Object.keys(action.payload).length >0)
          UserSlice.caseReducers.setUser(state,action.payload.user);
        else{
          state.notification = 'login fail:' + action.payload;
          console.log('login fail:',action.payload);
        }
      });
  },
});

export const selectUser = (state) => state.user.User;

export const { logOut,setUser } = UserSlice.actions;

export default UserSlice.reducer;