import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from "./authTypes";

export const authenticateUser = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest());
    console.log("HELLO 2");
    if (email === "admin" && password === "test") {
      dispatch(login_logoutSuccess(true));
    } else {
      dispatch(loginFailure());
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
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
