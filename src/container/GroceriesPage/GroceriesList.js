import React, { Component } from "react";

import { Fade, FadeTransform, Stagger } from "react-animation-components";

const GroceriesList = (props) => {
  return (
    <div
      className="tab-pane fade show active"
      ref={props.refObj[`c${props.category.id}`]}
    >
      <div className="container mb-2">
        <div className="row mt-3 mt-lg-0">
          {props.hasItems ? (
            <h3 className="grocery-sec-header">
              {props.category.name}{" "}
              <small>
                (
                {
                  props.groceryInstances.filter(
                    (grocery) => grocery.grocery.category === props.category.id
                  ).length
                }{" "}
                Items )
              </small>
            </h3>
          ) : null}
        </div>

        <div className="row" in>
          {props.groceryInstances
            .filter((g) => g.grocery.category === props.category.id)
            .map((item, index) => {
              return (
                <>
                  {item.id === undefined ? (
                    <div
                      className={`col-xl-2 col-lg-3 col-md-3 col-4 col-4 rainbow
                                   `}
                      in
                      key={item.id}
                    >
                      <div className={`small-card-padding `}>
                        <div
                          className={`card ${
                            props.groceryInstances.filter(
                              (g) => g.grocery.category === props.category.id
                            ).length === 1
                              ? "border-r-one-item"
                              : !index
                              ? "border-r-top-left"
                              : index + 1 ===
                                props.groceryInstances.filter(
                                  (g) =>
                                    g.grocery.category === props.category.id
                                ).length
                              ? "border-r-bottom-right"
                              : "no-border-r"
                          }`}
                        >
                          <div
                            className={`card-header ${
                              !index ? "border-r-top-left" : "no-border-r"
                            }`}
                          >
                            <h4 className={`grocery-header`}>
                              {item.grocery.name} {item.crossed ? "*" : ""}
                            </h4>
                            <input
                              className="grocery-note d-none d-lg-block"
                              placeholder="add detail"
                              value={item.grocery.detail}
                            />
                          </div>

                          <div className="card-body d-flex justify-content-center">
                            <img
                              className="card-image"
                              src={
                                item.custom_image === null
                                  ? item.grocery.default_image
                                  : item.grocery.custom_images.filter(
                                      (img) => img.id === item.custom_image
                                    )[0].url
                              }
                            />
                          </div>
                          <div
                            className="d-block d-lg-none edit-recipe-container"
                            data-target="#groceryModal"
                            data-toggle="modal"
                          >
                            <i className="fa fa-pencil-square-o ml-auto hvr-grow edit-recipe-icon"></i>
                          </div>
                          <div className="mobile-card-clickable-sec d-block d-md-none"></div>
                          <button
                            className="grocery-edit-btn btn"
                            data-toggle="modal"
                            data-target="#groceryModal"
                          >
                            EDIT
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`col-xl-2 col-lg-3 col-md-3 col-4 col-4 ${
                        item.id !== undefined ? "p-0" : "rainbow"
                      }`}
                    >
                      <div
                        className={`small-card-padding ${
                          item.new ? "blinking" : ""
                        }`}
                        onClick={() =>
                          props.crossOutGroceryInstanceInServer(item)
                        }
                      >
                        <div
                          className={`card small-card-padding ${
                            props.groceryInstances.filter(
                              (g) => g.grocery.category === props.category.id
                            ).length === 1
                              ? "border-r-one-item"
                              : !index
                              ? "border-r-top-left"
                              : index + 1 ===
                                props.groceryInstances.filter(
                                  (g) =>
                                    g.grocery.category === props.category.id
                                ).length
                              ? "border-r-bottom-right"
                              : "no-border-r"
                          }`}
                        >
                          <div
                            className={`card-header ${
                              !index ? "border-r-top-left" : "no-border-r"
                            }`}
                          >
                            <h4 className={`grocery-header`}>
                              {item.grocery.name} {item.crossed ? "*" : ""}
                            </h4>
                            <input
                              className="grocery-note d-none d-lg-block"
                              placeholder="add detail"
                              value={item.grocery.detail}
                            />
                          </div>

                          <div className="card-body d-flex justify-content-center">
                            <img
                              className="card-image"
                              src={
                                item.custom_image === null
                                  ? item.grocery.default_image
                                  : item.grocery.custom_images.filter(
                                      (img) => img.id === item.custom_image
                                    )[0].url
                              }
                            />
                          </div>
                          <div
                            className="d-block d-lg-none edit-recipe-container"
                            data-target="#groceryModal"
                            data-toggle="modal"
                          >
                            <i className="fa fa-pencil-square-o ml-auto hvr-grow edit-recipe-icon"></i>
                          </div>
                          <div className="mobile-card-clickable-sec d-block d-md-none"></div>
                          <button
                            className="grocery-edit-btn btn"
                            data-toggle="modal"
                            data-target="#groceryModal"
                          >
                            EDIT
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GroceriesList;
