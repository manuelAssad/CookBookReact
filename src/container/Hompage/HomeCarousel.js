import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
} from "reactstrap";

import { signupUser } from "../../redux/ActionCreators";

const items = [
  {
    src: "https://nucamp-cookbook.netlify.app/img/carousel-1.jpeg",
    altText: "Slide 1",
    title: "Intuitive Grocery List",
    caption:
      "Easily add items to grocery list and it will automatically be grouped into categories to save you time while shopping!",
  },
  {
    src: "https://nucamp-cookbook.netlify.app/img/carousel-2.jpeg",
    altText: "Slide 2",
    title: "Enjoy your favorite dishes",
    caption:
      "Browse through our recipe list and find your favorite dish and with a click of a button add all its ingredients to your grocery list!",
  },
  {
    src: "https://nucamp-cookbook.netlify.app/img/carousel-3.jpeg",
    altText: "Slide 3",
    title: "Create your own Recipe",
    caption:
      "If you couldn't find the recipe you want you can easily create your own recipe so that you make sure next time you go grocery shopping, you get all you need!",
  },
];

const Example = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);

  const handleSignupButton = () => {
    if (user) {
      if (activeIndex) window.location.href = "/recipes";
      else window.location.href = "/groceries";
    } else {
      setSignUpModalVisible(true);
    }
  };

  const handleSignUp = () => {
    let error = null;
    if (!username) {
      error = "username required";
    } else if (!password) {
      error = "no password provided";
    } else if (password2 !== password) {
      error = "passwords don't match";
    }

    setError(error);

    if (!error) {
      dispatch(
        signupUser({ username, password }, setSignUpModalVisible, setError)
      );
      setError("");
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item._id}
      >
        <Modal isOpen={signUpModalVisible}>
          <ModalHeader>Signup</ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center">
              <label className="col-5 mt-1" for="username">
                Username:
              </label>
              <div className="col-7">
                <input
                  className="form-control"
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <label className="col-5 mt-1" for="password">
                Password:
              </label>
              <div className="col-7">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <label className="col-5 mt-1" for="reenter-password">
                Re-enter Password:
              </label>
              <div className="col-7">
                <input
                  type="password"
                  className="form-control"
                  id="reenter-password"
                  placeholder="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </div>
            <div className="text-danger mt-2 ml-2">{error}</div>
            <div className="d-flex justify-content-center mt-3">
              <Button
                className="w-100 m-2 btn-color2 btn"
                onClick={handleSignUp}
              >
                SIGNUP
              </Button>
              <Button
                className="w-100 m-2 btn-danger btn"
                onClick={() => setSignUpModalVisible(false)}
              >
                CANCEL
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <div className="image-gradient">
          <img
            className="d-block w-100"
            src={item.src}
            alt="Breadcrumb Trail Campground"
          />
        </div>
        <div className="carousel-caption">
          <h1>{item.title}</h1>
          <p className="mt-sm-5 carousel-body">{item.caption}</p>
          <button
            className="btn btn-sm px-3 px-md-5 py-1 py-sm-2 mt-1 mt-sm-4 btn-color2 hvr-grow"
            onClick={handleSignupButton}
          >
            {" "}
            {user ? "TAKE ME THERE" : "GET STARTED"}
          </button>
        </div>
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    );
  });

  return (
    <div id="homeCarousel">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default Example;
