import {
  SAVE_ARTICLE_REQUEST,
  SAVE_ARTICLE_SUCCESS,
  SAVE_ARTICLE_FAILURE,
} from "./articleTypes";

const initialState = {
  article: "",
  error: "",
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ARTICLE_REQUEST:
      return {
        ...state,
      };
    case SAVE_ARTICLE_SUCCESS:
      return {
        article: action.payload,
        error: "",
      };
    case SAVE_ARTICLE_FAILURE:
      return {
        article: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
