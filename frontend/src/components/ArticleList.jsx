import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      showSuccess: false,
    };
    this.deleteArticle = this.deleteArticle.bind(this);
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
        if (data != null) {
          this.setState({ showSuccess: true });
          setTimeout(() => this.setState({ showSuccess: false }), 5000);
          this.setState({
            articles: this.state.articles.filter(
              (article) => article.id != articleId
            ),
          });
        } else {
          this.setState({ showSuccess: false });
        }
      });
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.showSuccess ? "block" : "none" }}>
          <MyToast
            children={{
              show: this.state.showSuccess,
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
                {this.state.articles.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">No articles found!</td>
                  </tr>
                ) : (
                  this.state.articles.map((article) => (
                    <tr key={article.id}>
                      <td>
                        <img
                          src={article.coverPhotoURL}
                          width="25"
                          height="25"
                        />
                        &nbsp; &nbsp;
                        {article.title}
                      </td>
                      <td>{article.author}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-outline-primary btn-sm">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
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
        </div>
      </div>
    );
  }
}

export default ArticleList;
