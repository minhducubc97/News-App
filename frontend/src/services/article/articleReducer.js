import {
  ARTICLE_GET_REQUEST,
  ARTICLE_POST_REQUEST,
  ARTICLE_PUT_REQUEST,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_SUCCESS,
  ARTICLE_FAILURE,
  CATEGORIES_GET_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
} from "./articleTypes";

const initialState = {
  article: "",
  error: "",
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_POST_REQUEST:
    case ARTICLE_GET_REQUEST:
    case ARTICLE_PUT_REQUEST:
    case ARTICLE_DELETE_REQUEST:
    case CATEGORIES_GET_REQUEST:
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
    case CATEGORIES_SUCCESS:
      return {
        categories: action.payload,
        error: "",
      };
    case CATEGORIES_FAILURE:
      return {
        categories: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
