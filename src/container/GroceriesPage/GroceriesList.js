import React, { Component, useState } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const GroceriesList = (props) => {
  const [itemToBeDeleted, setItemToBeDeleted] = useState(null);
  const [itemOnFocus, setItemOnFocus] = useState(null);
  const handleDeleteClick = (id) => {
    setItemOnFocus(id);
    setItemToBeDeleted(id);
    setTimeout(() => {
      props.deleteGroceryInstance(id);
    }, 400);
  };

  const handleCrossOutItem = (item) => {
    setItemOnFocus(item.id);
    props.crossOutGroceryInstanceInServer(item);
  };

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

        <div className="row">
          {props.groceryInstances
            .filter((g) => g.grocery.category === props.category.id)
            .map((item, index) => {
              return (
                <>
                  {item.id === undefined ? (
                    <div
                      className={`col-xl-2 col-lg-3 col-md-3 col-4 col-4 rainbow
                                   `}
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
                    <CSSTransition
                      key={item.id}
                      timeout={400}
                      classNames="cardAnimation"
                      in={itemToBeDeleted === item.id ? false : true}
                      unmountOnExit
                    >
                      <div
                        className={`col-xl-2 col-lg-3 col-md-3 col-4 col-4 ${
                          item.id !== undefined ? "p-0" : "rainbow"
                        }`}
                      >
                        <div>
                          <div
                            className={`small-card-padding ${
                              item.new ? "blinking" : ""
                            }`}
                          >
                            <div
                              className={`card  ${
                                item.crossed ? "striked-out" : null
                              } small-card-padding ${
                                props.groceryInstances.filter(
                                  (g) =>
                                    g.grocery.category === props.category.id
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
                                <h4
                                  className={`grocery-header`}
                                  onClick={() => handleCrossOutItem(item)}
                                >
                                  <span
                                    className={`${
                                      itemOnFocus === item.id
                                        ? item.crossed
                                          ? "strike"
                                          : "strike-remove"
                                        : item.crossed
                                        ? "item-striked"
                                        : ""
                                    }`}
                                  >
                                    {item.grocery.name}
                                  </span>
                                </h4>
                                <input
                                  className="grocery-note d-none d-lg-block"
                                  placeholder="add detail"
                                  value={item.grocery.detail}
                                />
                              </div>

                              <div
                                className="card-body d-flex justify-content-center"
                                onClick={() => handleCrossOutItem(item)}
                              >
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
                                className={`d-block ${
                                  item.crossed ? "" : "d-lg-none"
                                } edit-recipe-container`}
                                data-target="#groceryModal"
                                data-toggle="modal"
                                onClick={
                                  item.crossed
                                    ? () => handleDeleteClick(item.id)
                                    : "edit"
                                }
                              >
                                <i
                                  className={`fa  ${
                                    item.crossed
                                      ? "fa-trash"
                                      : "fa-pencil-square-o"
                                  } ml-auto hvr-grow edit-recipe-icon`}
                                ></i>
                              </div>

                              <div
                                className="mobile-card-clickable-sec d-block d-md-none"
                                onClick={() => handleCrossOutItem(item)}
                              ></div>

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
                      </div>
                    </CSSTransition>
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
