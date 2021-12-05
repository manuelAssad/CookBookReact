import React, { Component } from "react";

const GroceryMenu = (props) => {
  return (
    <div className="d-none d-lg-block col-lg-4 col-xl-3 py-5 sticky-menu ">
      <div className="list-group">
        <div className="input-group ing-search-container mb-2">
          <label for="ingredient2" className="input-group-prepend">
            <span
              className="input-group-text ingredient-search bg-ing"
              id="basic-addon1"
            >
              <i className="fa fa-search ml-auto hvr-grow"></i>
            </span>
          </label>
          <input
            id="ingredient2"
            type="text"
            className="form-control ingredient-search ingredient-search-input"
            placeholder="Search for Ingredient"
          ></input>
          <div className="input-group-append">
            <a className="btn btn-ing-search ingredient-search">
              <span className="d-flex button-ing-text">+ Add</span>
            </a>
          </div>
          <div className="search-box">
            <div className="search-cat">Suggested Items</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Bread</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Jam</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Honey</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Tomatoes</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Apples</div>
            <div className="search-cat">Bakery</div>
            <div className="mb-1 pb-2 ml-1 border-bottom added-item">Bread</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Jam</div>
            <div className="mb-1 pb-2 ml-1 border-bottom added-item">Honey</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Tomatoes</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Apples</div>
            <div className="search-cat">Breakfast & Cereal</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Cucumber</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Bread</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Jam</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Honey</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Tomatoes</div>
            <div className="search-cat">Dairy</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Apples</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Cucumber</div>
          </div>
        </div>
        {props.groceryCategories.map((cat) => {
          return (
            <a
              className={`list-group-item list-group-item-action ${
                props.activeCat === cat.id ? "active" : ""
              }`}
              onClick={() => props.handleClickCategory(cat.id)}
            >
              {cat.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default GroceryMenu;
