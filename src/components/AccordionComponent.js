import React from "react";
import ReactDOM from "react-dom";

import { Fade, Stagger } from "react-animation-components";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      foundNode: false,
    };
  }

  componentDidMount() {
    if (!this.state.foundNode)
      window.setTimeout(() => {
        const el = ReactDOM.findDOMNode(this);
        const height = el.querySelector(".panel-inner").scrollHeight;
        this.setState({
          height,
          foundNode: true,
        });
      }, 333);
  }

  render() {
    const { title, description, activeTab, index, activateTab } = this.props;
    const { height } = this.state;
    const isActive = activeTab === index;
    const innerStyle = {
      height: `${isActive ? height : 0}px`,
    };

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel-label" role="tab" onClick={activateTab}>
          <span className="panel-label-number">{index + 1}</span>
          {title}
        </button>
        <div className="panel-inner" style={innerStyle} aria-hidden={!isActive}>
          <p className="panel-content">{description}</p>
        </div>
      </div>
    );
  }
}

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };

    this.activateTab = this.activateTab.bind(this);
  }

  activateTab(index) {
    this.setState((prev) => ({
      activeTab: prev.activeTab === index ? -1 : index,
    }));
  }

  render() {
    const { steps } = this.props;
    const { activeTab } = this.state;
    return (
      <div className="accordion" role="tablist">
        <Stagger in>
          {steps.map((step, index) => (
            <Fade in style={{ marginBottom: 5 }}>
              <Panel
                key={index}
                activeTab={activeTab}
                index={index}
                {...step}
                activateTab={this.activateTab.bind(null, index)}
              />
            </Fade>
          ))}
        </Stagger>
      </div>
    );
  }
}

export default Accordion;
