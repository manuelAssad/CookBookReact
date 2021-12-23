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
      animationData: require("../../add.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={41}
          width={41}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
          style={{
            position: "absolute",
            marginLeft: -23,
            marginTop: this.props.all ? -2 : -6,
          }}
        />
      </div>
    );
  }
}
