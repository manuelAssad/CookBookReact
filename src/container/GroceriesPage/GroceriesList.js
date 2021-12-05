import React, { Component } from "react";

const GroceriesList = (props) => {
  return (
    <div
      className="tab-pane fade show active"
      ref={props.refObj[`c${props.category.id}`]}
    >
      <div className="container mb-2">
        <div className="row mt-3 mt-lg-0">
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
        </div>
        <div className="row">
          {props.groceryInstances.map((item) => {
            if (item.grocery.category === props.category.id)
              return (
                <div className="col-xl-2 col-lg-3 col-md-3 col-4 col-4 p-0 ">
                  <div className="small-card-padding">
                    <div className="card border-r-top-left">
                      <div className="card-header border-r-top-left">
                        <h4 className="grocery-header">{item.grocery.name}</h4>
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
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroceriesList;
