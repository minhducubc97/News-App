import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./authTypes";

export const authenticateUser = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest());
    console.log("HELLO 2");
    if (email === "admin" && password === "test") {
      dispatch(loginSuccess(true));
    } else {
      dispatch(loginFailure());
    }
  };
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (isLoggedIn) => {
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
