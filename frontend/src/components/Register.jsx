import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  changeName = (event) => {
    this.setState({ name: event.target.value });
  };

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  registerUser = (event) => {};

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-7">
          <div className="card border border-dark bg-dark text-white">
            <div className="card-header">
              <h5>Register</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-dark text-white"
                      required
                      autoComplete="off"
                      value={this.state.name}
                      onChange={this.changeName}
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>
                <br />
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
                type="button"
                className="btn btn-sm btn-success"
                onClick={this.validateUser}
                disabled={
                  this.state.name.length === 0 ||
                  this.state.email.length === 0 ||
                  this.state.password.length === 0
                }
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
