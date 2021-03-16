import React, { Component } from "react";

class Footer extends Component {
  render() {
    let year = new Date().getFullYear();

    return (
      <nav className="navbar bg-dark navbar-dark fixed-bottom">
        <div className="container">
          <div className="col col-lg-12 text-center text-muted pt-2 pb-2">
            <div>
              {year} - {year + 1} All rights reserved by Duc Nguyen
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Footer;
