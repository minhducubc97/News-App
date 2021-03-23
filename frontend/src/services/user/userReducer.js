import { USER_GET_REQUEST, USER_SUCCESS, USER_FAILURE } from "./userTypes";

const initialState = {
  users: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return {
        ...state,
      };
    case USER_SUCCESS:
      return {
        users: action.payload,
        error: "",
      };
    case USER_FAILURE:
      return {
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
