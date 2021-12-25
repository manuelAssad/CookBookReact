import React from "react";
import Lottie from "react-lottie";

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const buttonStyle = {
      display: "block",
      margin: "10px auto",
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require("../error.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={30}
          width={30}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
          style={{ position: "absolute", zIndex: 9999, right: 4, top: 20 }}
        />
      </div>
    );
  }
}
