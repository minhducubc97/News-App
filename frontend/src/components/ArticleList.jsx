import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

class ArticleList extends Component {
  render() {
    return (
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
              <tr align="center">
                <td colSpan="6">No articles found!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ArticleList;
