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
      loop: false,
      autoplay: true,
      animationData: require("../../retry.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={38}
          width={38}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
          style={{ position: "absolute", marginLeft: -22, marginTop: -8 }}
        />
      </div>
    );
  }
}
