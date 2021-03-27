import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import articleReducer from "./article/articleReducer";
import authReducer from "./user/auth/authReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  articleReducer: articleReducer,
  authReducer: authReducer,
});

export default rootReducer;
