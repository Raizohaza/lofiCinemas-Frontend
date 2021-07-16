import * as actionTypes from "../constants/authConstants";
import axios from "../configAxios";
// import { getSession, setSession } from "../../constants/function";

export const PostLogin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    const { data } = await axios.post("/user/login", {
      email: email,
      password: password,
      role: 1,
    });
    if (data.user.active !== null) {
      let error = { message: "Email does not exist" };
      throw error;
    }
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        user: data.user,
        loggedIn: true,
      },
    });
    sessionStorage.setItem("users", JSON.stringify(getState().users));
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const PostLogout = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.LOGOUT_REQUEST,
  });
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
    payload: {
      user: {},
      loggedIn: false,
    },
  });
  sessionStorage.setItem("users", JSON.stringify(getState().users));
};

export const PostRegister = (email, password, name, phone) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    const { data } = await axios.post("/signup", {
      url: "http://localhost:4000",
      email: email,
      password: password,
      name: name,
      phone: phone,
    });

    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: {
        user: data,
        loggedIn: false,
      },
    });
    sessionStorage.setItem("users", JSON.stringify(getState().users));
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const postVerifyEmail = (email, code) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    const { data } = await axios.post("/verify", {
      email: email,
      code: code,
    });

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getImportCode = (code) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    const { data } = await axios.post("/import-code", {
      code: code,
    });

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        user: data,
        valueIP: true,
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const postVerifyForgotPassword = (email, code) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    const { data } = await axios.post("/verifycoderesetpass", {
      email: email,
      code: code,
    });
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        user: data,
      },
    });
    sessionStorage.setItem("users", JSON.stringify(getState().users));
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const postForgotPassword = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    const { data } = await axios.post("/forgotpassword", {
      email: email,
    });
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        user: data,
      },
    });
    sessionStorage.setItem("users", JSON.stringify(getState().users));
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const postResetPassword = (email, password) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resetpasswordforgot", {
      password: password,
      email: email,
    });
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        user: data,
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const postChangeProfile = (email, name, phone) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/changeprofile", {
      email: email,
      name: name,
      phone: phone,
    });
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        user: data.user,
        message: data.message,
        loggedIn: true,
      },
    });
    sessionStorage.setItem("users", JSON.stringify(getState().users));
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const postChangePassword = (email, oldPassword, newPassword) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resetpassword", {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        user: data.user,
        message: data.message,
        loggedIn: true,
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};