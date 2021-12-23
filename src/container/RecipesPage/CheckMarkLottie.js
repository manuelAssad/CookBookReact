import React from "react";
import Lottie from "react-lottie";

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isPaused: true });
    }, 1000);
  }
  render() {
    const buttonStyle = {
      display: "block",
      margin: "10px auto",
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require("../../checkmark.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={28}
          width={28}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
          style={{ position: "absolute", marginLeft: -16 }}
        />
      </div>
    );
  }
}
