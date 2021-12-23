import React, { Component } from "react";

const RecipeCard = ({ recipe, handleRecipeClick }) => {
  return (
    <div
      className="col-xl-4 col-md-6 col-12 p-2  hvr-grow"
      onClick={() => handleRecipeClick(recipe.id)}
    >
      <div className="recipe-card-container">
        <div className="d-flex recipe-owner">
          <div
            className={`${
              recipe.owner.avatar
                ? "recipe-owner-w-image"
                : "recipe-owner-wo-image"
            }`}
          >
            {recipe.owner.avatar ? (
              <span>
                <img src={recipe.owner.avatar} className="owner-image" />
                <span className="recipe-owner-name ml-1">
                  {recipe.owner.name}
                </span>
              </span>
            ) : (
              <span className="font-weight-bold">
                {recipe.owner.name[0]}
                <span className="recipe-owner-name font-weight-normal">
                  {recipe.owner.name.slice(1)}
                </span>
              </span>
            )}
          </div>
        </div>

        <div class="d-flex edit-buttons pl-4 pb-4">
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#" data-dismiss="modal">
                {" "}
                <i class="fa fa-edit mr-2"></i> Edit Recipe
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                {" "}
                <i class="fa fa-trash mr-2"></i> Delete Recipe{" "}
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                {" "}
                <i class="fa fa-heart mr-2"></i> Like Recipe{" "}
              </a>
            </li>
          </ul>
          <div class="edit-dot"></div>
          <div class="edit-dot"></div>
          <div class="edit-dot"></div>
        </div>

        <div
          className="recipe-image-gradient"
          data-target="#recipeModal"
          data-toggle="modal"
        >
          <img
            className="w-100"
            src={recipe.image}
            alt="Breadcrumb Trail Campground"
          />
        </div>
        <div
          className="recipe-title"
          data-target="#recipeModal"
          data-toggle="modal"
        >
          {recipe.title}
        </div>
        <div
          className="recipe-details container align-items-end"
          data-target="#recipeModal"
          data-toggle="modal"
        >
          <div>{recipe.servings} servings</div>
          <div className="ml-3">
            <i className="fa fa-clock-o"></i>

            <span className="ml-1">{recipe.cook_time} min</span>
          </div>
          <div className="ml-auto">
            <div>Prep Time</div>
            <div className="d-flex">
              <div className="mx-auto">{recipe.prep_time} min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
