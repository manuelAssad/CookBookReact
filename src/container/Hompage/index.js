import React, { Component } from "react";

import Carousel from "./HomeCarousel";
import About from "./AboutSection";
import Contact from "./ContactSection";

import ReactScrollDetect, { DetectSection } from "react-scroll-detect";

import "./styles.scss";

class Homepage extends Component {
  render() {
    return (
      <div>
        <ReactScrollDetect
          triggerPoint="center"
          onChange={this.props.handleSectionChange}
          triggerPoint="center"
        >
          <DetectSection>
            <Carousel />
          </DetectSection>
          <DetectSection>
            <About />
          </DetectSection>
          <DetectSection>
            <Contact />
          </DetectSection>
        </ReactScrollDetect>
      </div>
    );
  }
}

export default Homepage;
