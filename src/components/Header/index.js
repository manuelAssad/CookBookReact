import React, { Component } from 'react';

import Navbar from './Navbar';
import "./styles.scss"

class Header extends Component {

  render() {
      return (
        <div>
          <Navbar currentSection={this.props.currentSection} handleSectionChange={this.props.handleSectionChange}/>
        </div>
      );
    }
}

export default Header;