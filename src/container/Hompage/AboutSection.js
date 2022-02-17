import React, { Component } from "react";

import myPic from "../../myPic.png";

class About extends Component {
  render() {
    return (
      <div className="container" id="about">
        <div className="row">
          <h2 className="mx-auto mt-3 mt-md-5">About</h2>
        </div>
        <div className="row">
          <img
            className="mx-auto about-image mt-2 mt-md-4"
            src={myPic}
            alt="Breadcrumb Trail Campground"
          />
        </div>
        <div className="row">
          <p className="mx-auto mt-3 text-center">
            <span className=" text-dark text-uppercase font-weight-bold">
              Manuel Assad
            </span>
            <br />
            Cookbook Founder
          </p>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="small-divider mx-auto mt-3 mb-4"></div>
        </div>
        <div className="row">
          <p className="mx-auto about-paragraph">
            I am an Electrical Engineer Graduate recently decided to make a
            career shift in Software development. Always fascinated in building
            creative products and turning ideas into reality. Always found
            website development a career that is best suited to apply my
            creative ideas into reality and here I am building my first web app.
            And ive decided to build my first website related to something i
            really have passion for!
          </p>
        </div>

        <div className="row">
          <h2 className="mx-auto mt-3 mt-md-5">Why Cookbook?</h2>
        </div>

        <div className="row my-5">
          <div className="mx-auto row">
            <div className="col-12 col-md-4">
              <h4 className="text-center">
                <i className="fa fa-users ml-auto mb-3 about-icon hvr-grow"></i>{" "}
                <br />
                Convenience
              </h4>
              <p className="text-center px-4">
                Accessed and modified by different users and from different
                devices.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h4 className="text-center">
                <i className="fa fa-cutlery ml-auto mb-3 about-icon hvr-grow"></i>{" "}
                <br />
                Recipes Book
              </h4>
              <p className="text-center  px-4">
                Create or search for your favorite recipes and automatically add
                its ingredients to your groceries list.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h4 className="text-center">
                <i className="fa fa-leaf ml-auto mb-3 about-icon hvr-grow"></i>{" "}
                <br />
                Groceries List
              </h4>
              <p className="text-center px-4">
                Very well organized groceries list grouped into different
                categories to make it easier for grocery shopping.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
