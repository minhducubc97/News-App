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
import axios from "axios";

export const getArticle = (articleId) => {
  return (dispatch) => {
    dispatch(getArticleRequest());
    axios
      .get("http://localhost:8080/api/v1/articles/" + articleId, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then((response) => {
        dispatch(articleSuccess(response.data));
      })
      .catch((error) => {
        dispatch(articleFailure(error.message));
      });
  };
};

export const createArticle = (article) => {
  return (dispatch) => {
    dispatch(createArticleRequest());
    axios
      .post("http://localhost:8080/api/v1/articles", article, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then((response) => {
        dispatch(articleSuccess(response.data));
      })
      .catch((error) => {
        dispatch(articleFailure(error.message));
      });
  };
};

export const updateArticle = (article) => {
  return (dispatch) => {
    dispatch(updateArticleRequest());
    axios
      .put("http://localhost:8080/api/v1/articles/" + article.id, article, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then((response) => {
        dispatch(articleSuccess(response.data));
      })
      .catch((error) => {
        dispatch(articleFailure(error.message));
      });
  };
};

export const deleteArticle = (articleId) => {
  return (dispatch) => {
    dispatch(deleteArticleRequest());
    axios
      .delete("http://localhost:8080/api/v1/articles/" + articleId, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then((response) => {
        dispatch(articleSuccess(response.data));
      })
      .catch((error) => {
        dispatch(articleFailure(error.message));
      });
  };
};

export const getCategories = () => {
  return (dispatch) => {
    dispatch({
      type: CATEGORIES_GET_REQUEST,
    });
    axios
      .get("http://localhost:8080/api/v1/articles/categories", {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then((response) => {
        dispatch({
          type: CATEGORIES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CATEGORIES_FAILURE,
          payload: error,
        });
      });
  };
};

const getArticleRequest = () => {
  return {
    type: ARTICLE_GET_REQUEST,
  };
};

const createArticleRequest = () => {
  return {
    type: ARTICLE_POST_REQUEST,
  };
};

const updateArticleRequest = () => {
  return {
    type: ARTICLE_PUT_REQUEST,
  };
};

const deleteArticleRequest = () => {
  return {
    type: ARTICLE_DELETE_REQUEST,
  };
};

const articleSuccess = (article) => {
  return {
    type: ARTICLE_SUCCESS,
    payload: article,
  };
};

const articleFailure = (error) => {
  return {
    type: ARTICLE_FAILURE,
    payload: error,
  };
};
