import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

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
        key={item.id}
      >
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
          <button className="btn btn-sm px-3 px-md-5 py-1 py-sm-2 mt-1 mt-sm-4 btn-color2 hvr-grow">
            {" "}
            TAKE ME THERE
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
