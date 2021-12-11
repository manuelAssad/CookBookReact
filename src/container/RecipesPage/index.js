import React, { Component } from "react";

import RecipeCard from "./RecipeCard";
import RecipeMenu from "./RecipeMenu";

import { connect } from "react-redux";
import { fetchRecipes } from "../../redux/ActionCreators";

import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

const mapDispatchToProps = {
  fetchRecipes: (id, catArray) => fetchRecipes(id, catArray),
};

class Recipes extends Component {
  state = {
    recipeCategory: null,
  };

  async componentDidMount() {
    console.log("MOUNTEDDD");
    const recipeCatinUrlFull = this.props.history.location.search;
    const searchObj = this.searchStringToObject(recipeCatinUrlFull);
    if (searchObj.category) {
      this.setState({ recipeCategory: searchObj.category });
      this.props.fetchRecipes(
        searchObj.category,
        await this.props.recipes.categoriesFetched
      );
    } else {
      this.setState({ recipeCategory: null });
      await this.props.fetchRecipes(null, this.props.recipes.categoriesFetched);
    }
  }

  searchStringToObject = (searchString) => {
    const searchObj = {};
    const searchStringsArray = searchString.split("?");
    searchStringsArray.forEach((searchString) => {
      if (searchString) {
        const searchKeyValueArray = searchString.split("=");
        searchObj[searchKeyValueArray[0]] = searchKeyValueArray[1];
      }
    });
    return searchObj;
  };

  handleClickMenuItem = (id) => {
    this.props.history.push(`/recipes${id === null ? "" : `?category=${id}`}`);
  };

  render() {
    return (
      <>
        <div className="grocery-container px-4">
          <div className="row">
            <RecipeMenu
              recipeCategories={[
                { id: 0, name: "Main Courses" },
                { id: 1, name: "Side Dishes" },
                { id: 2, name: "Desserts" },
              ]}
              handleClickMenuItem={this.handleClickMenuItem}
              recipeCategory={this.state.recipeCategory}
              isLoading={this.props.recipes.isLoading}
            />

            <div id="addRecipeModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header  lightgreen-bg">
                    <h3 className="modal-title ml-auto pl-4">
                      Create New Recipe
                    </h3>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-12 mb-4">
                          <img
                            src="https://delo-vcusa.ru/lazy-load-placeholder.png"
                            className="recipe-modal-image img-fluid img-thumbnail"
                            alt="responsive image"
                          />
                          <div className="add-recipe-photo-text">Add photo</div>
                        </div>
                        <div className="col-12 mt-3">
                          <form>
                            <div className="form-row">
                              <div className="col-12">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="recipeName"
                                  placeholder="Recipe name"
                                />
                              </div>
                            </div>

                            <div className="form-row mt-3 row">
                              <div className="col-md-6">
                                <select
                                  className="form-control mr-2 ml-md-0"
                                  id="categorySelect"
                                >
                                  <option>Select Category...</option>
                                  <option>Main Course</option>
                                  <option>Side Dish</option>
                                  <option>Dessert</option>
                                  <option>Other</option>
                                </select>
                              </div>

                              <div className="col-12 col-md-6 d-flex align-self-start mt-3 mt-md-0">
                                <div className="text-center my-auto ml-md-auto">
                                  Servings:
                                </div>
                                <div
                                  className="btn-group ml-md-auto"
                                  role="group"
                                  aria-label="Basic example"
                                >
                                  <div className="align-self-center mr-3 ml-3">
                                    1
                                  </div>
                                  <button
                                    type="button"
                                    className="btn border-r-left servings-button"
                                  >
                                    +
                                  </button>
                                  <button
                                    type="button"
                                    className="btn border-r-right servings-button"
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="form-row mt-3">
                              <div className="col-md-6 d-flex">
                                <span className="my-auto">Cook Time:</span>
                                <input
                                  type="text"
                                  className="form-control ml-2 cook-time-input small-inputs-margin-1"
                                  id="recipeName"
                                  placeholder=""
                                />
                                <span className="my-auto ml-2">min</span>
                              </div>

                              <div className="col-md-6 d-flex mt-2 mt-md-0">
                                <span className="my-auto ml-md-auto">
                                  Prep Time:
                                </span>
                                <input
                                  type="text"
                                  className="form-control ml-2 cook-time-input small-inputs-margin-2"
                                  id="recipeName"
                                  placeholder=""
                                />
                                <span className="my-auto ml-2">min</span>
                              </div>
                            </div>

                            <div className="form-row mt-3">
                              <div className="col-12 col-md-6">
                                <button
                                  type="button"
                                  className="btn add-recipe-modal-btn w-100 hvr-grow"
                                  data-target="#addIngredientModal"
                                  data-dismiss="modal"
                                  data-toggle="modal"
                                >
                                  Add Ingredients
                                </button>
                              </div>
                              <div className="col-12 col-md-6 mt-2 mt-md-0">
                                <button
                                  type="button"
                                  className="btn add-recipe-modal-btn w-100 hvr-grow"
                                  data-dismiss="modal"
                                  data-toggle="modal"
                                  data-target="#addStepModal"
                                >
                                  {" "}
                                  Add Preparation Steps
                                </button>
                              </div>
                            </div>

                            <div className="form-row mt-5">
                              <div className="col-6">
                                <button
                                  type="button"
                                  className="btn grocery-modal-button-1 hvr-grow"
                                >
                                  SAVE
                                </button>
                              </div>
                              <div className="col-6">
                                <button
                                  type="submit"
                                  className="btn grocery-modal-button-2 hvr-grow"
                                  data-dismiss="modal"
                                >
                                  CANCEL
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="addIngredientModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header  lightgreen-bg">
                    <h3 className="modal-title ml-auto pl-4">Add Ingredient</h3>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      data-target="#addRecipeModal"
                      data-toggle="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-12 mt-3">
                          <form>
                            <div className="form-row">
                              <div className="col-12">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="recipeName"
                                  placeholder="Ingredient Name"
                                />
                              </div>
                              <div className="col-12 mt-3">
                                <label for="recipeNote">
                                  Note (quantity, description):
                                </label>
                                <textarea
                                  id="recipeNote"
                                  type="text"
                                  className="form-control"
                                  id="recipeName"
                                ></textarea>
                              </div>
                            </div>

                            <div className="form-row mt-5">
                              <div className="col-6">
                                <button
                                  type="button"
                                  className="btn grocery-modal-button-1"
                                  data-toggle="modal"
                                  data-dismiss="modal"
                                  data-target="#ingredientsListModal"
                                >
                                  ADD INGREDIENT
                                </button>
                              </div>
                              <div className="col-6">
                                <button
                                  type="submit"
                                  className="btn grocery-modal-button-2"
                                  data-dismiss="modal"
                                  data-toggle="modal"
                                  data-target="#addRecipeModal"
                                >
                                  CANCEL
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="ingredientsListModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header  lightgreen-bg">
                    <h3 className="modal-title ml-auto pl-4">
                      Ingredients List
                    </h3>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#addRecipeModal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12 mt-3 igredients-list-item">
                          <div className="row">
                            <div className="col">
                              <i
                                className="fa fa-edit hvr-grow"
                                data-dismiss="modal"
                                data-toggle="modal"
                                data-target="#addIngredientModal"
                              ></i>
                              <span className="ml-2">Bread -</span>
                              <small className="ingredient-list-item-note">
                                5 packs
                              </small>
                            </div>
                            <div className="d-flex pr-4">
                              <div className="ml-auto">
                                <span className="edit-ingredient-item">
                                  {" "}
                                  <i className="fa fa-trash hvr-grow"></i>
                                </span>
                                <span>
                                  <i className="fa fa-bars hvr-grow ml-1"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mt-1 igredients-list-item">
                          <div className="row">
                            <div className="col">
                              <i className="fa fa-edit hvr-grow"></i>
                              <span className="ml-2">Bread -</span>
                              <small className="ingredient-list-item-note">
                                5 packs
                              </small>
                            </div>
                            <div className="d-flex pr-4">
                              <div className="ml-auto">
                                <span className="edit-ingredient-item">
                                  {" "}
                                  <i className="fa fa-trash hvr-grow"></i>
                                </span>
                                <span>
                                  <i className="fa fa-bars hvr-grow ml-1"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <button
                          className="btn w-100 mt-4 add-recipe-modal-btn"
                          data-dismiss="modal"
                          data-toggle="modal"
                          data-target="#addIngredientModal"
                        >
                          Add Ingredient
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="addStepModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header  lightgreen-bg">
                    <h3 className="modal-title ml-auto pl-4">
                      Add Preparation Step
                    </h3>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      data-target="#addRecipeModal"
                      data-toggle="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-12 mt-3">
                          <form>
                            <div className="form-row">
                              <div className="col-12">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="stepTitle"
                                  placeholder="Step Title"
                                />
                              </div>
                              <div className="col-12 mt-3">
                                <label for="stepDescription">
                                  Step Description:
                                </label>
                                <textarea
                                  id="stepDescription"
                                  type="text"
                                  className="form-control"
                                ></textarea>
                              </div>
                            </div>

                            <div className="form-row mt-5">
                              <div className="col-6">
                                <button
                                  type="button"
                                  className="btn grocery-modal-button-1"
                                  data-toggle="modal"
                                  data-dismiss="modal"
                                  data-target="#stepsListModal"
                                >
                                  ADD STEP
                                </button>
                              </div>
                              <div className="col-6">
                                <button
                                  type="submit"
                                  className="btn grocery-modal-button-2"
                                  data-dismiss="modal"
                                  data-toggle="modal"
                                  data-target="#addRecipeModal"
                                >
                                  CANCEL
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="stepsListModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header  lightgreen-bg">
                    <h3 className="modal-title ml-auto pl-4">
                      Preparation Steps List
                    </h3>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#addRecipeModal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12 mt-3 igredients-list-item">
                          <div className="row">
                            <div className="col">
                              <i
                                className="fa fa-edit hvr-grow"
                                data-dismiss="modal"
                                data-toggle="modal"
                                data-target="#addStepModal"
                              ></i>
                              <span className="ml-2">Boil Water</span>
                            </div>
                            <div className="d-flex pr-4">
                              <div className="ml-auto">
                                <span className="edit-ingredient-item">
                                  {" "}
                                  <i className="fa fa-trash hvr-grow"></i>
                                </span>
                                <span>
                                  <i className="fa fa-bars hvr-grow ml-1"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mt-1 igredients-list-item">
                          <div className="row">
                            <div className="col">
                              <i className="fa fa-edit hvr-grow"></i>
                              <span className="ml-2">Boil Water</span>
                            </div>
                            <div className="d-flex pr-4">
                              <div className="ml-auto">
                                <span className="edit-ingredient-item">
                                  {" "}
                                  <i className="fa fa-trash hvr-grow"></i>
                                </span>
                                <span>
                                  <i className="fa fa-bars hvr-grow ml-1"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <button
                          className="btn w-100 mt-4 add-recipe-modal-btn hvr-grow"
                          data-dismiss="modal"
                          data-toggle="modal"
                          data-target="#addStepModal"
                        >
                          Add Preparation Step
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-7 col-xl-8 offset-xl-3 offset-lg-4 pt-lg-5 pl-lg-5">
              {this.props.recipes.isLoading ? (
                <div>Loading..</div>
              ) : (
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    <div className="row overflow-hidden">
                      {this.props.recipes.filteredRecipes.map((recipe) => {
                        return <RecipeCard key={recipe.id} {...recipe} />;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Recipes)
);
