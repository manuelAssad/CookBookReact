import React, { useState, useEffect } from "react";

import { CSSTransition } from "react-transition-group";

import { useDispatch } from "react-redux";

import {
  updatedGroceryInstanceDetail,
  postGrocery,
} from "../../redux/ActionCreators";

import OutsideClickHandler from "react-outside-click-handler";

import Spinner from "../../components/SpinnerGL";
import Error from "../../components/ErrorGL";

import { baseUrl } from "../../shared/baseUrl";

const GroceryCard = (props) => {
  useEffect(() => {
    console.log("SHOULDUPDATEEEEE", props.item);
    setCardDetail(props.item.detail);
  }, [props.item.detail]);

  const [cardDetail, setCardDetail] = useState(props.item.detail);
  const [cardActive, setCardActive] = useState(false);
  const dispatch = useDispatch();
  const handleEditDetail = (e) => {
    setCardDetail(e.target.value);
    setCardActive(true);
  };

  const handleSubmitDetail = () => {
    if (cardActive) {
      setCardActive(false);
      dispatch(updatedGroceryInstanceDetail(props.item, cardDetail));
    }
  };

  const handleClickRestart = () => {
    dispatch(updatedGroceryInstanceDetail(props.item, cardDetail));
  };
  return (
    <div
      className={`col-xl-2 col-lg-3 col-md-3 col-4 col-4 p-0`}
      onClick={() =>
        props.item._id ? null : dispatch(postGrocery(props.item, true))
      }
    >
      <div className={`${!props.item._id ? "vibrate" : null}`}>
        <div
          className={` ${
            props.item.crossed ? "striked-out" : null
          } small-card-padding ${props.item.new ? "blinking" : ""}`}
        >
          <div
            className={`card   ${
              props.item.crossed ? "striked-out" : null
            } small-card-padding ${
              props.groceryInstances.filter(
                (g) => g.grocery.category === props.category._id
              ).length === 1
                ? "border-r-one-item"
                : !props.index
                ? "border-r-top-left"
                : props.index + 1 ===
                  props.groceryInstances.filter(
                    (g) => g.grocery.category === props.category._id
                  ).length
                ? "border-r-bottom-right"
                : "no-border-r"
            }`}
          >
            <div
              className={`card-header ${
                !props.index ? "border-r-top-left" : "no-border-r"
              }`}
            >
              {props.item.updatingDetailStatus === "pending" ? (
                <Spinner />
              ) : props.item.updatingDetailStatus === "failed" ? (
                <div onClick={handleClickRestart}>
                  <Error />
                </div>
              ) : null}
              <div
                className={`grocery-header`}
                onClick={() => props.handleCrossOutItem(props.item)}
              >
                <span
                  className={`card-header-name ${
                    props.itemOnFocus === props.item._id
                      ? props.item.crossed
                        ? "strike"
                        : "strike-remove"
                      : props.item.crossed
                      ? "item-striked"
                      : ""
                  }`}
                >
                  {props.item.grocery.name.slice(0, 12)}{" "}
                  {!props.item._id ? (
                    <i
                      className="fa fa-exclamation-triangle ml-auto hvr-grow"
                      style={{ color: "red" }}
                    ></i>
                  ) : null}
                  {props.item.grocery.name.length > 12 ? "..." : null}
                </span>
              </div>

              <OutsideClickHandler onOutsideClick={handleSubmitDetail}>
                <input
                  className="grocery-note"
                  placeholder="add detail"
                  value={!props.item._id ? "failed to upload" : cardDetail}
                  onChange={handleEditDetail}
                />
              </OutsideClickHandler>
            </div>

            <div
              className="card-body d-flex justify-content-center"
              onClick={() => props.handleCrossOutItem(props.item)}
            >
              <img
                className="card-image"
                src={
                  props.item.custom_image === null
                    ? `${baseUrl}/${props.item.grocery.default_image}`
                    : props.item.grocery.custom_images.filter(
                        (img) => img._id === props.item.custom_image
                      )[0].url
                }
              />
            </div>

            <div
              className={`d-block ${
                props.item.crossed ? "" : "d-lg-none"
              } edit-recipe-container`}
              data-target="#groceryModal"
              data-toggle="modal"
              onClick={
                props.item.crossed
                  ? () => props.handleDeleteClick(props.item._id)
                  : "edit"
              }
            >
              <i
                className={`fa  ${
                  props.item.crossed ? "fa-trash" : "fa-pencil-square-o"
                } ml-auto hvr-grow edit-recipe-icon`}
              ></i>
            </div>

            <div
              className="mobile-card-clickable-sec d-block d-md-none"
              onClick={() => props.handleCrossOutItem(props.item)}
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
  );
};
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
    setItemOnFocus(item._id);
    props.crossOutGroceryInstanceInServer(item);
  };

  return (
    <div
      className="tab-pane fade show active"
      ref={props.refObj[`c${props.category._id}`]}
    >
      {console.log("LISTTTRENDERED", props.groceryInstances)}
      <div className="container mb-2">
        <div
          className={`row ${
            props.groceryInstanceToFilter ? "" : "mt-3"
          } mt-lg-0`}
        >
          {props.hasItems ? (
            <h3 className="grocery-sec-header">
              {props.category.name}{" "}
              <small>
                (
                {
                  props.groceryInstances.filter(
                    (grocery) => grocery.grocery.category === props.category._id
                  ).length
                }{" "}
                Items )
              </small>
            </h3>
          ) : null}
        </div>

        <div className="row">
          {props.groceryInstances
            .filter((g) => g.grocery.category === props.category._id)
            .map((item, index) => {
              return (
                <>
                  {item._id === undefined && item.new ? (
                    <div
                      className={`col-xl-2 col-lg-3 col-md-3 col-4 col-4 rainbow
                                   `}
                      key={item._id}
                    >
                      <div className={`small-card-padding `}>
                        <div
                          className={`card ${
                            props.groceryInstances.filter(
                              (g) => g.grocery.category === props.category._id
                            ).length === 1
                              ? "border-r-one-item"
                              : !index
                              ? "border-r-top-left"
                              : index + 1 ===
                                props.groceryInstances.filter(
                                  (g) =>
                                    g.grocery.category === props.category._id
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
                              {item.grocery.name.slice(0, 12)}
                              {item.grocery.name.length > 12 ? "..." : null}
                            </h4>
                            <input
                              className="grocery-note"
                              placeholder="add detail"
                              value={item.detail}
                            />
                          </div>

                          <div className="card-body d-flex justify-content-center">
                            <img
                              className="card-image"
                              src={
                                item.custom_image === null
                                  ? `${baseUrl}/${item.grocery.default_image}`
                                  : item.grocery.custom_images.filter(
                                      (img) => img._id === item.custom_image
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
                      key={item._id}
                      timeout={400}
                      classNames="cardAnimation"
                      in={itemToBeDeleted === item._id ? false : true}
                    >
                      <GroceryCard
                        item={item}
                        groceryInstances={props.groceryInstances}
                        category={props.category}
                        handleCrossOutItem={handleCrossOutItem}
                        handleDeleteClick={handleDeleteClick}
                        index={index}
                        itemOnFocus={itemOnFocus}
                      />
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
