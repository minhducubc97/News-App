import { USER_GET_REQUEST, USER_SUCCESS, USER_FAILURE } from "./userTypes";
import axios from "axios";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get(
        "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
      )
      .then((response) => {
        dispatch(fetchUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};

const fetchUserRequest = () => {
  return {
    type: USER_GET_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: USER_SUCCESS,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: USER_FAILURE,
    payload: error,
  };
};
