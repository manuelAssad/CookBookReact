import React, { Component } from "react";

import Navbar from "./Navbar";
import "./styles.scss";

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar
          currentSection={this.props.currentSection}
          handleScrollSectionChange={this.props.handleScrollSectionChange}
        />
      </div>
    );
  }
}

export default Header;
