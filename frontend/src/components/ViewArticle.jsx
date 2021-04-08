import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticle } from "../services/functions";

class ViewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      author: "",
      coverPhotoURL: "",
      content: "",
      category: "NA",
    };
  }

  componentDidMount() {
    const articleId = this.props.match.params.id;
    if (articleId) {
      this.getArticleById(articleId);
    }
  }

  getArticleById = (articleId) => {
    this.props.getArticle(articleId);
    setTimeout(() => {
      let article = this.props.articleObject.article;
      if (article != null) {
        this.setState({
          id: article.id,
          title: article.title,
          author: article.author,
          coverPhotoURL: article.coverPhotoURL,
          content: article.content,
          category: article.category,
        });
      }
    }, 1000);
  };

  render() {
    const { id, title, author, coverPhotoURL, content, category } = this.state;
    return (
      <div>
        <h1 className="text-white">{title}</h1>
        <h5 className="text-muted">{author}</h5>
        <br />
        <img
          src={coverPhotoURL}
          alt="coverPhotoURL"
          className="rounded mx-auto d-block"
        ></img>
        <br />
        <span style={{ "white-space": "pre-line" }} className="text-white">
          {content}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articleObject: state.articleReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticle: (articleId) => dispatch(getArticle(articleId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);
