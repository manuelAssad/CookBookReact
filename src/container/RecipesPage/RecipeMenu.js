import React, { Component } from "react";

const RecipeMenu = (props) => {
  const handleClickMenuItem = (catId) => {
    if (props.isLoading) {
    } else props.handleClickMenuItem(catId);
  };
  return (
    <div className="d-none d-lg-block col-lg-4 col-xl-3 py-5 sticky-menu ">
      <div className="list-group" id="list-tab" role="tablist">
        <div className="input-group ing-search-container mb-2">
          <label for="recipe2" className="input-group-prepend">
            <span
              className="input-group-text ingredient-search bg-ing"
              id="basic-addon1"
            >
              <i className="fa fa-search ml-auto hvr-grow"></i>
            </span>
          </label>
          <input
            id="recipe2"
            type="text"
            className="form-control ingredient-search ingredient-search-input"
            placeholder="Search for Recipe"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          ></input>

          <div className="search-box">
            <div className="search-cat">Suggested Recipes</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Chicken Alfredo</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Pepperoni Pizza</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">BBQ Burger</div>
            <div className="mb-1 pb-2 ml-1 border-bottom">
              Cookies & Cream Ice Cream
            </div>
            <div className="mb-1 pb-2 ml-1 border-bottom">Apple Tart</div>
          </div>
        </div>

        <a
          className={`list-group-item list-group-item-action ${
            props.recipeCategory === null ? "active" : null
          }`}
          onClick={() => handleClickMenuItem(null)}
        >
          All Recipes
        </a>
        {props.recipeCategories.map((cat) => {
          return (
            <a
              key={cat.id}
              className={`list-group-item list-group-item-action ${
                props.recipeCategory == cat.id ? "active" : null
              }`}
              onClick={() => handleClickMenuItem(cat.id)}
            >
              {cat.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeMenu;
