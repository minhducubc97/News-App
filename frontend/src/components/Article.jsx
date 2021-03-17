import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faSave,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.showSuccess = false;
    this.state.method = "post";
    this.submitArticle = this.submitArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeAuthor = this.changeAuthor.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.changecoverPhotoURL = this.changecoverPhotoURL.bind(this);
    this.navigateToArticleList = this.navigateToArticleList.bind(this);
  }

  initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoURL: "",
    content: "",
  };

  componentDidMount = () => {
    const articleId = this.props.match.params.id;
    if (articleId) {
      this.state.method = "put";
      this.getArticleById(articleId);
    }
  };

  getArticleById = (articleId) => {
    axios
      .get("http://localhost:8080/api/v1/articles/" + articleId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            title: response.data.title,
            author: response.data.author,
            coverPhotoURL: response.data.coverPhotoURL,
            content: response.data.content,
          });
        }
      })
      .catch((error) => {
        console.log("[ERROR]: " + error);
      });
  };

  submitArticle = (event) => {
    event.preventDefault(); // refresh the state
    const article = {
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      content: this.state.content,
    };
    axios
      .post("http://localhost:8080/api/v1/articles", article)
      .then((response) => {
        if (response.data !== null) {
          this.setState({ showSuccess: true, method: "post" });
          setTimeout(() => this.setState({ showSuccess: false }), 3000);
          setTimeout(() => this.navigateToArticleList(), 2000);
        } else {
          this.setState({ showSuccess: false });
        }
      });
    this.setState(this.initialState);
  };

  editArticle = (event) => {
    console.log("FUCKING HERE!");
    event.preventDefault(); // refresh the state
    const article = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      content: this.state.content,
    };
    axios
      .put("http://localhost:8080/api/v1/articles/" + this.state.id, article)
      .then((response) => {
        if (response.data !== null) {
          this.setState({ showSuccess: true, method: "put" });
          setTimeout(() => this.setState({ showSuccess: false }), 3000);
          setTimeout(() => this.navigateToArticleList(), 2000);
        } else {
          this.setState({ showSuccess: false });
        }
      });
    this.setState(this.initialState);
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

export default Article;
