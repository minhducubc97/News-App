import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from "./authTypes";
import axios from "axios";

export const authenticateUser = (email, password) => {
  const credentials = {
    email: email,
    password: password,
  };
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post("http://localhost:8080/api/v1/users/authenticate", credentials)
      .then((response) => {
        let token = response.data.token;
        localStorage.setItem("jwtToken", token);
        dispatch(login_logoutSuccess(true));
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(login_logoutSuccess(false));
  };
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const login_logoutSuccess = (isLoggedIn) => {
  return {
    type: LOGIN_SUCCESS,
    payload: isLoggedIn,
  };
};

const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
    payload: false,
  };
};
