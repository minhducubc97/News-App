import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logoutUser } from "../services/functions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    this.props.logoutUser();
  };

  render() {
    const guestNav = (
      <div class="collapse navbar-collapse me-4">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">
              Register
            </a>
          </li>
        </ul>
      </div>
    );
    const memberNav = (
      <div class="collapse navbar-collapse me-4">
        <ul className="navbar-nav me-auto">
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
          <li className="nav-item">
            <a className="nav-link" href="/users">
              User List
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/logout" onClick={this.logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <a className="navbar-brand" href="/">
          <FontAwesomeIcon icon={faNewspaper} />
          &nbsp;&nbsp;
          <span>News</span>
        </a>
        {this.props.auth.isLoggedIn ? memberNav : guestNav}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.authReducer);
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
