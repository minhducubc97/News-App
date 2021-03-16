import React, { Component } from "react";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      coverPhotoURL: "",
      content: "",
    };
  }

  render() {
    return (
      <div className="card border border-dark bg-dark text-white">
        <div className="card-header">Add a new article</div>
        <form id="articleForm">
          <div className="card-body">
            <div className="form-row">
              <div className="form-group mb-3 col-md-5">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  id="title"
                  aria-describedby="title"
                  placeholder="Enter article title"
                />
              </div>
              <div className="form-group mb-3 col-md-5">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  id="author"
                  placeholder="Enter author's name"
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control bg-dark text-white"
                id="content"
                rows="3"
                placeholder="Enter article content"
              ></textarea>
            </div>
          </div>
          <div className="card-footer mb-1 d-flex flex-row-reverse">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Article;
