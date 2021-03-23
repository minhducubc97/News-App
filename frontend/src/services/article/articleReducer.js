import {
  ARTICLE_GET_REQUEST,
  ARTICLE_POST_REQUEST,
  ARTICLE_PUT_REQUEST,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_SUCCESS,
  ARTICLE_FAILURE,
} from "./articleTypes";

const initialState = {
  article: "",
  error: "",
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_POST_REQUEST ||
      ARTICLE_GET_REQUEST ||
      ARTICLE_PUT_REQUEST ||
      ARTICLE_DELETE_REQUEST:
      return {
        ...state,
      };
    case ARTICLE_SUCCESS:
      return {
        article: action.payload,
        error: "",
      };
    case ARTICLE_FAILURE:
      return {
        article: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
