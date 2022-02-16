import React, { Component } from "react";

const RecipeMenu = (props) => {
  const handleClickMenuItem = (catId) => {
    if (props.isLoading) {
    } else props.handleClickMenuItem(catId);
  };
  return (
    <div
      className="d-none d-lg-block col-lg-4 col-xl-3 py-5 sticky-menu "
      style={{ marginTop: 20 }}
    >
      <div className="list-group" id="list-tab" role="tablist">
        {/* <div className="input-group ing-search-container mb-2">
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
        </div> */}

        {console.log(props.recipeCategory)}
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
              key={cat._id}
              className={`list-group-item list-group-item-action ${
                props.recipeCategory == cat._id ? "active" : null
              }`}
              onClick={() => handleClickMenuItem(cat._id)}
            >
              {console.log(props.recipeCategory, cat, "IDSSSCOMPARISONN")}
              {cat.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeMenu;
