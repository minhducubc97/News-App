import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from "./authTypes";

const initialState = {
  isLoggedIn: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
