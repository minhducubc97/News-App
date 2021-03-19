import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
  faFastBackward,
  faStepBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      showSuccess: false,
      curPage: 1,
      articlesPerPage: 10,
    };
    this.changePage = this.changePage.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    axios
      .get("http://localhost:8080/api/v1/articles")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ articles: data });
      });
  };

  deleteArticle = (articleId) => {
    axios
      .delete("http://localhost:8080/api/v1/articles/" + articleId)
      .then((response) => response.data)
      .then((data) => {
        if (data !== null) {
          this.setState({ showSuccess: true });
          setTimeout(() => this.setState({ showSuccess: false }), 5000);
          this.setState({
            articles: this.state.articles.filter(
              (article) => article.id !== articleId
            ),
          });
        } else {
          this.setState({ showSuccess: false });
        }
      });
  };

  firstPage = () => {
    if (this.state.curPage > 1) {
      this.setState({
        curPage: 1,
      });
    }
  };

  previousPage = () => {
    if (this.state.curPage > 1) {
      this.setState({
        curPage: this.state.curPage - 1,
      });
    }
  };

  nextPage = () => {
    if (
      this.state.curPage <
      Math.ceil(this.state.articles.length / this.state.articlesPerPage)
    ) {
      this.setState({
        curPage: this.state.curPage + 1,
      });
    }
  };

  lastPage = () => {
    var totalPages = Math.ceil(
      this.state.articles.length / this.state.articlesPerPage
    );
    if (this.state.curPage < totalPages) {
      this.setState({
        curPage: totalPages,
      });
    }
  };

  changePage = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };

  render() {
    const { articles, showSuccess, curPage, articlesPerPage } = this.state;
    const lastIdx = curPage * articlesPerPage;
    const firstIdx = lastIdx - articlesPerPage;
    const curArticleList = articles.slice(firstIdx, lastIdx);
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const pageNumCss = {
      width: "50px",
      border: "1px solid #17A2B8",
      textAlign: "center",
      fontWeight: "bold",
      color: "#17A2B8",
    };

    return (
      <div>
        <div style={{ display: showSuccess ? "block" : "none" }}>
          <MyToast
            children={{
              show: showSuccess,
              message: "Article deleted successfully!",
            }}
          />
        </div>
        <div className="card border border-dark bg-dark text-white">
          <div className="card-header">
            <FontAwesomeIcon icon={faList} />
            &nbsp;List of Articles
          </div>
          <div className="card-body">
            <table className="table table-dark table-hover table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">No articles found!</td>
                  </tr>
                ) : (
                  curArticleList.map((article) => (
                    <tr key={article.id}>
                      <td>
                        <img
                          src={article.coverPhotoURL}
                          alt="coverPhoto"
                          width="25"
                          height="25"
                        />
                        &nbsp; &nbsp;
                        {article.title}
                      </td>
                      <td>{article.author}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <a
                            className="btn btn-outline-primary btn-sm"
                            href={"edit/" + article.id}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </a>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => this.deleteArticle(article.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <div className="float-start">
              Page {curPage} of {totalPages}
            </div>
            <div className="float-end">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-info"
                    type="button"
                    disabled={curPage === 1 ? true : false}
                    onClick={this.firstPage}
                  >
                    <FontAwesomeIcon icon={faFastBackward} />
                    &nbsp; First
                  </button>
                  <button
                    className="btn btn-outline-info"
                    type="button"
                    disabled={curPage === 1 ? true : false}
                    onClick={this.previousPage}
                  >
                    <FontAwesomeIcon icon={faStepBackward} />
                    &nbsp; Previous
                  </button>
                </div>
                <input
                  className="form-control bg-dark"
                  style={pageNumCss}
                  value={curPage}
                  name="curPage"
                  onChange={this.changePage}
                />
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-info"
                    type="button"
                    disabled={curPage === totalPages ? true : false}
                    onClick={this.nextPage}
                  >
                    <FontAwesomeIcon icon={faStepForward} />
                    &nbsp; Next
                  </button>
                  <button
                    className="btn btn-outline-info"
                    type="button"
                    disabled={curPage === totalPages ? true : false}
                    onClick={this.lastPage}
                  >
                    <FontAwesomeIcon icon={faFastForward} />
                    &nbsp; Last
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleList;
