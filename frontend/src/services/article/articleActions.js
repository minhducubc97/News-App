import {
  SAVE_ARTICLE_REQUEST,
  SAVE_ARTICLE_SUCCESS,
  SAVE_ARTICLE_FAILURE,
} from "./articleTypes";
import axios from "axios";

export const saveArticle = (article) => {
  return (dispatch) => {
    dispatch(saveArticleRequest());
    axios
      .post("http://localhost:8080/api/v1/articles", article)
      .then((response) => {
        dispatch(saveArticleSuccess(response.data));
      })
      .catch((error) => {
        dispatch(saveArticleFailure(error.message));
      });
  };
};

const saveArticleRequest = () => {
  return {
    type: SAVE_ARTICLE_REQUEST,
  };
};

const saveArticleSuccess = (article) => {
  return {
    type: SAVE_ARTICLE_SUCCESS,
    payload: article,
  };
};

const saveArticleFailure = (error) => {
  return {
    type: SAVE_ARTICLE_FAILURE,
    payload: error,
  };
};
