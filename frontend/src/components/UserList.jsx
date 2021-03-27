import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faFastBackward,
  faStepBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { fetchUsers } from "../services/functions";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curPage: 1,
      usersPerPage: 10,
    };
    this.changePage = this.changePage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchUsers();
  };

  changePage = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
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
    let usersLength = this.props.userData.users.length;
    console.log(usersLength);
    if (this.state.curPage < Math.ceil(usersLength / this.state.usersPerPage)) {
      this.setState({
        curPage: this.state.curPage + 1,
      });
    }
  };

  lastPage = () => {
    let usersLength = this.props.userData.users.length;
    var totalPages = Math.ceil(usersLength / this.state.usersPerPage);
    if (this.state.curPage < totalPages) {
      this.setState({
        curPage: totalPages,
      });
    }
  };

  render() {
    const { curPage, usersPerPage } = this.state;
    const userData = this.props.userData;
    const users = userData.users;
    const lastIdx = curPage * usersPerPage;
    const firstIdx = lastIdx - usersPerPage;
    const curUserList = users.slice(firstIdx, lastIdx);
    const totalPages = Math.ceil(users.length / usersPerPage);
    const pageNumCss = {
      width: "50px",
      border: "1px solid #17A2B8",
      textAlign: "center",
      fontWeight: "bold",
      color: "#17A2B8",
    };

    return (
      <div>
        {userData.error ? (
          <div className="alert alert-danger">{userData.error}</div>
        ) : (
          <div className="card border border-dark bg-dark text-white">
            <div className="card-header">
              <FontAwesomeIcon icon={faUsers} />
              &nbsp;List of Users
            </div>
            <div className="card-body">
              <table className="table table-dark table-hover table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr align="center">
                      <td colSpan="6">No users found!</td>
                    </tr>
                  ) : (
                    curUserList.map((user, index) => (
                      <tr key={index}>
                        <td>
                          {user.first} {user.last}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.created}</td>
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
