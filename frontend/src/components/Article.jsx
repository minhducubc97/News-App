import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faSave } from "@fortawesome/free-solid-svg-icons";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      coverPhotoURL: "",
      content: "",
    };
    this.submitArticle = this.submitArticle.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeAuthor = this.changeAuthor.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.changecoverPhotoURL = this.changecoverPhotoURL.bind(this);
  }

  submitArticle = (event) => {
    alert(
      this.state.title +
        this.state.author +
        this.state.coverPhotoURL +
        this.state.content
    );
    event.preventDefault(); // refresh the state
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

  render() {
    return (
      <div className="card border border-dark bg-dark text-white">
        <div className="card-header">
          <FontAwesomeIcon icon={faPlusSquare} />
          &nbsp;Add a new article
        </div>
        <form id="articleForm" onSubmit={this.submitArticle}>
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
                  required="true"
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
                  required="true"
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
                required="true"
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
                required="true"
              ></textarea>
            </div>
          </div>
          <div className="card-footer mb-1 d-flex flex-row-reverse">
            <button type="submit" className="btn btn-primary">
              <FontAwesomeIcon icon={faSave} />
              &nbsp; Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Article;
