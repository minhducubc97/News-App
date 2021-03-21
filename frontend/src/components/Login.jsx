import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  initialState = {
    email: "",
    password: "",
    error: "",
  };

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  validateUser = (event) => {
    console.log("HERERERE");
    event.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    // axios
    //   .post("http://localhost:8080/api/v1/user/authenticate", credentials)
    //   .then((response) => {
    //     this.props.isLoggedIn = true;
    //     let token = response.data.token;
    //     localStorage.setItem("jwtToken", token);
    //     return this.props.history.push("/");
    //   })
    //   .catch((error) => {
    //     this.props.isLoggedIn = false;
    //     console.log("Error validating user!");
    //     this.resetLoginForm();
    //     this.setState({ error: "Invalid email and password" });
    //   });
    if (credentials.email === "admin" && credentials.password === "test") {
      this.props.isLoggedIn = true;
      return this.props.history.push("/");
    } else {
      this.props.isLoggedIn = false;
      this.resetLoginForm();
      this.setState({ error: "Invalid email and password" });
    }
  };

  resetLoginForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-5">
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          )}
          <div className="card border border-dark bg-dark text-white">
            <div className="card-header">
              <h5>Login</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="email"
                      className="form-control bg-dark text-white"
                      required
                      autoComplete="off"
                      value={this.state.email}
                      onChange={this.changeEmail}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <br />
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type="password"
                      className="form-control bg-dark text-white"
                      required
                      autoComplete="off"
                      value={this.state.password}
                      onChange={this.changePassword}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer text-end">
              <button
                type="submit"
                onClick={this.validateUser}
                className="btn btn-sm btn-success"
                disabled={
                  this.state.email.length === 0 ||
                  this.state.password.length === 0
                }
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
