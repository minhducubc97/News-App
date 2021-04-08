import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faSave,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "./MyToast";
import { connect } from "react-redux";
import {
  getArticle,
  createArticle,
  updateArticle,
  getCategories,
} from "../services/functions";

class SaveArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      author: "",
      coverPhotoURL: "",
      content: "",
      category: "NA",
      method: "post",
      categories: [],
      showSuccess: false,
    };
    this.submitArticle = this.submitArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeAuthor = this.changeAuthor.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.changecoverPhotoURL = this.changecoverPhotoURL.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.navigateToArticleList = this.navigateToArticleList.bind(this);
  }

  componentDidMount = () => {
    const articleId = this.props.match.params.id;
    if (articleId) {
      this.setState({ method: "put" });
      this.getArticleById(articleId);
    }
    this.getAllCategories();
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
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

  submitArticle = (event) => {
    event.preventDefault(); // refresh the state
    const article = {
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      content: this.state.content,
      category: this.state.category,
    };
    this.props.createArticle(article);
    setTimeout(() => {
      if (this.props.articleObject.article != null) {
        this.setState({ showSuccess: true, method: "post" });
        setTimeout(() => this.setState({ showSuccess: false }), 3000);
        setTimeout(() => this.navigateToArticleList(), 2000);
      } else {
        this.setState({ showSuccess: false });
      }
    }, 1000);
    this.setState(this.initialState);
  };

  editArticle = (event) => {
    event.preventDefault(); // refresh the state
    const article = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      content: this.state.content,
      category: this.state.category,
    };
    this.props.updateArticle(article);
    setTimeout(() => {
      if (this.props.articleObject.article != null) {
        this.setState({ showSuccess: true, method: "put" });
        setTimeout(() => this.setState({ showSuccess: false }), 3000);
        setTimeout(() => this.navigateToArticleList(), 2000);
      } else {
        this.setState({ showSuccess: false });
      }
    }, 1000);
    this.setState(this.initialState);
  };

  getAllCategories = () => {
    this.props.getCategories();
    setTimeout(() => {
      let articleCategories = this.props.articleObject.categories;
      if (articleCategories) {
        this.setState({
          categories: [{ value: "NA", display: "Select Category" }].concat(
            articleCategories.map((category) => {
              return { value: category, display: category };
            })
          ),
        });
      }
    }, 1000);
  };

  changeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  changeAuthor = (event) => {
    this.setState({ author: event.target.value });
  };

  changeContent = (event) => {
    this.setState({ content: event.target.value });
  };

  changecoverPhotoURL = (event) => {
    this.setState({ coverPhotoURL: event.target.value });
  };

  changeCategory = (event) => {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  };

  navigateToArticleList = () => {
    return this.props.history.push("/articles");
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.showSuccess ? "block" : "none" }}>
          <MyToast
            children={{
              show: this.state.showSuccess,
              message:
                this.state.method === "put"
                  ? "Article edited successfully!"
                  : "Article added successfully!",
            }}
          />
        </div>
        <div className="card border border-dark bg-dark text-white">
          <div className="card-header">
            <FontAwesomeIcon
              icon={this.state.method === "put" ? faEdit : faPlusSquare}
            />
            &nbsp;
            {this.state.method === "put" ? "Edit article" : "Add a new article"}
          </div>
          <form
            id="articleForm"
            onSubmit={
              this.state.method === "put"
                ? this.editArticle
                : this.submitArticle
            }
          >
            <div className="card-body">
              <div className="form-row">
                <div className="form-group mb-3 col-md-5">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    id="formTitle"
                    aria-describedby="title"
                    placeholder="Enter article title"
                    value={this.state.title}
                    onChange={this.changeTitle}
                    required={true}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group mb-3 col-md-5">
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    id="formAuthor"
                    placeholder="Enter author's name"
                    value={this.state.author}
                    onChange={this.changeAuthor}
                    required={true}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group mb-3 col-md-5">
                <label className="form-label">Cover Photo URL</label>
                <div className="input-group mb-3">
                  {" "}
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    id="formCoverPhotoURL"
                    placeholder="Enter article cover photo URL"
                    value={this.state.coverPhotoURL}
                    onChange={this.changecoverPhotoURL}
                    required={true}
                    autoComplete="off"
                  />
                  {this.state.coverPhotoURL !== "" && (
                    <img
                      alt="CoverPhotoURL"
                      src={this.state.coverPhotoURL}
                      className="rounded-right"
                      width="40"
                      height="40"
                    />
                  )}
                </div>
              </div>
              <div className="form-group mb-3 col-md-5">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-control bg-dark text-white"
                  id="formCategory"
                  value={this.state.category}
                  onChange={this.changeCategory}
                  required={true}
                >
                  {this.state.categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.display}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Content</label>
                <textarea
                  className="form-control bg-dark text-white"
                  id="formContent"
                  rows="3"
                  placeholder="Enter article content"
                  value={this.state.content}
                  onChange={this.changeContent}
                  required={true}
                  autoComplete="off"
                ></textarea>
              </div>
            </div>
            <div className="card-footer mb-1 d-flex flex-row-reverse">
              <button type="submit" className="btn btn-primary">
                <FontAwesomeIcon icon={faSave} />
                &nbsp;
                {this.state.method === "put" ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
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
    createArticle: (article) => dispatch(createArticle(article)),
    updateArticle: (article) => dispatch(updateArticle(article)),
    getCategories: () => dispatch(getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveArticle);
