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
import "./style.css";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      showSuccess: false,
      curPage: 1,
      articlesPerPage: 10,
      totalPages: 0,
      totalElements: 0,
      sortDir: "asc",
    };
    this.changePage = this.changePage.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  componentDidMount() {
    this.getArticles(this.state.curPage);
  }

  getArticles = (curPage) => {
    axios
      .get(
        "http://localhost:8080/api/v1/articles?pageNumber=" +
          (curPage - 1) +
          "&pageSize=" +
          this.state.articlesPerPage +
          "&sortBy=author&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          articles: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          curPage: data.number + 1,
        });
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
      this.getArticles(1);
    }
  };

  previousPage = () => {
    if (this.state.curPage > 1) {
      this.getArticles(this.state.curPage - 1);
    }
  };

  nextPage = () => {
    if (this.state.curPage < this.state.totalPages) {
      this.getArticles(this.state.curPage + 1);
    }
  };

  lastPage = () => {
    if (this.state.curPage < this.state.totalPages) {
      this.getArticles(this.state.totalPages);
    }
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    this.getArticles(targetPage);
    this.setState({ [event.target.name]: targetPage });
  };

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
        ? this.setState({ sortDir: "desc" })
        : this.setState({ sortDir: "asc" });
      this.getArticles(this.state.curPage);
    }, 300);
  };

  render() {
    const {
      articles,
      showSuccess,
      curPage,
      articlesPerPage,
      totalPages,
      totalElements,
    } = this.state;
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
                  <th scope="col" onClick={this.sortData}>
                    Author
                    <div
                      className={
                        this.state.sortDir === "asc"
                          ? "arrow arrow-down"
                          : "arrow arrow-up"
                      }
                    ></div>
                  </th>
                  <th scope="col">Category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">No articles found!</td>
                  </tr>
                ) : (
                  articles.map((article) => (
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
                      <td>{article.category}</td>
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
