import React, { Component } from "react";

class MyToast extends Component {
  render() {
    const myToastCss = {
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: "1",
    };
    return (
      <div style={myToastCss}>
        {this.props.children.show ? (
          <div
            className="toast show bg-success text-white"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header bg-success text-white">
              <h5 className="mr-auto">Success</h5>
            </div>
            <div className="toast-body">{this.props.children.message}</div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MyToast;
