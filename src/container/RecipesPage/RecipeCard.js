import React, { Component } from "react";

import { baseUrl } from "../../shared/baseUrl";
const RecipeCard = ({
  recipe,
  handleRecipeClick,
  user,
  handleDeleteRecipe,
  handleEditRecipe,
}) => {
  return (
    <div className="col-xl-4 col-md-6 col-12 p-2  hvr-grow">
      <div className="recipe-card-container">
        {recipe.deleting ? (
          <div
            style={{
              position: "absolute",
              fontSize: 20,
              opacity: 1,
              color: "white",
              backgroundColor: "rgba(124, 169, 130,0.7)",
              width: "95%",
              height: "90%",
              borderRadius: 10,
              zIndex: 999,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
            }}
          >
            <span>Deleting ...</span>
          </div>
        ) : null}
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
                  {recipe.owner.username}
                </span>
              </span>
            ) : (
              <span className="font-weight-bold">
                {recipe.owner.username[0].toUpperCase()}
                <span className="recipe-owner-name font-weight-normal">
                  {recipe.owner.username.slice(1)}
                </span>
              </span>
            )}
          </div>
        </div>
        {recipe.owner.username === user.username && (
          <div class="d-flex edit-buttons pl-4 pb-4">
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  data-dismiss="modal"
                  onClick={() => handleEditRecipe()}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <i class="fa fa-edit mr-2"></i> Edit Recipe
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteRecipe(recipe._id)}
                >
                  {" "}
                  <i class="fa fa-trash mr-2"></i> Delete Recipe{" "}
                </a>
              </li>
              {/* <li>
              <a class="dropdown-item" href="#">
                {" "}
                <i class="fa fa-heart mr-2"></i> Like Recipe{" "}
              </a>
            </li> */}
            </ul>
            <div class="edit-dot"></div>
            <div class="edit-dot"></div>
            <div class="edit-dot"></div>
          </div>
        )}

        <div
          className="recipe-image-gradient"
          onClick={() => handleRecipeClick(recipe._id)}
        >
          {console.log(recipe.image, "RECIPEIMAGEEE")}
          <img
            className="w-100"
            src={`${baseUrl}/${recipe.image}`}
            alt={recipe.title}
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
