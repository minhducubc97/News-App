import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
      <div className="navbar-nav ms-auto me-4">
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
        <Link to={"/register"} className="nav-link">
          Register
        </Link>
      </div>
    );
    const memberNav = (
      <>
        <div className="navbar-nav me-auto">
          <Link to={"/add-article"} className="nav-link">
            Add Article
          </Link>
          <Link to={"/articles"} className="nav-link">
            Article List
          </Link>
          <Link to={"/users"} className="nav-link">
            User List
          </Link>
        </div>
        <div className="navbar-nav ms-auto me-4">
          <Link to={"/logout"} className="nav-link" onClick={this.logout}>
            Logout
          </Link>
        </div>
      </>
    );

    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <Link to={"/"} className="navbar-brand">
          <FontAwesomeIcon icon={faNewspaper} />
          &nbsp;&nbsp;
          <span>News</span>
        </Link>
        {this.props.auth.isLoggedIn ? memberNav : guestNav}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
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
