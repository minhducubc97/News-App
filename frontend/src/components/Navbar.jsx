import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <a className="navbar-brand nav-link" href="/">
          <i className="fas fa-newspaper"></i>
          &nbsp;&nbsp;
          <span>News</span>
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/add-article">
              Add Article
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/articles">
              Article List
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
