import React, { Component } from "react";
import { Alert, Modal } from "reactstrap";

import RecipeCard from "./RecipeCard";
import RecipeMenu from "./RecipeMenu";

import { connect } from "react-redux";
import {
  fetchRecipes,
  setRecipeCategory,
  setHistory,
  setSearchActive,
  handleChangeNewGrocery,
  changeRecipeCategory,
  deleteRecipe,
} from "../../redux/ActionCreators";

import { withRouter } from "react-router-dom";

import ContentLoader from "react-content-loader";

import RecipeDetailsModal from "./RecipeDetailsModal";

import RecipeEditModal from "./RecipeEditModal";

import { fetchRecipeDetails } from "../../redux/ActionCreators";

import { actions } from "react-redux-form";
import ModalBody from "reactstrap/lib/ModalBody";

import LottieAnimation from "../../components/AddedL";

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  fetchRecipes: (id, catArray) => fetchRecipes(id, catArray),
  setRecipeCategory: (cat) => setRecipeCategory(cat),
  setHistory: (history) => setHistory(history),
  fetchRecipeDetails: (id) => fetchRecipeDetails(id),
  setSearchActive: (v) => setSearchActive(v),
  handleChangeNewGrocery: (v) => handleChangeNewGrocery(v),
  changeRecipeCategory: (category) => changeRecipeCategory(category),
  deleteRecipe: (id) => deleteRecipe(id),
};

class Recipes extends Component {
  state = {
    placeholderArray: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    detailsModalOpen: false,
    recipeOpen: {},
    editModalOpen: false,
    visible: true,
  };
  componentDidMount() {
    this.props.setHistory(this.props.history);
    const recipeCatinUrlFull = this.props.history.location.search;
    const searchObj = this.searchStringToObject(recipeCatinUrlFull);
    if (searchObj.category) {
      this.props.setRecipeCategory(searchObj.category);
      this.props.changeRecipeCategory(
        this.props.recipes.categories.filter(
          (c) => c._id == searchObj.category
        )[0]
      );
      this.props.fetchRecipes(
        searchObj.category,
        this.props.recipes.categoriesFetched
      );
    } else {
      this.props.setRecipeCategory(null);
      this.props.changeRecipeCategory({});
      this.props.fetchRecipes(null, this.props.recipes.categoriesFetched);
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

  onDismiss = () => this.setState({ visible: false });

  handleClickMenuItem = (id) => {
    this.props.history.push(`/recipes${id === null ? "" : `?category=${id}`}`);
    this.props.setHistory(this.props.history);
    const recipeCatinUrlFull = this.props.history.location.search;
    const searchObj = this.searchStringToObject(recipeCatinUrlFull);
    if (searchObj.category) {
      this.props.setRecipeCategory(searchObj.category);
      this.props.changeRecipeCategory(
        this.props.recipes.categories.filter(
          (c) => c._id == searchObj.category
        )[0]
      );
      this.props.fetchRecipes(
        searchObj.category,
        this.props.recipes.categoriesFetched
      );
    } else {
      this.props.setRecipeCategory(null);
      this.props.changeRecipeCategory({});
      this.props.fetchRecipes(null, this.props.recipes.categoriesFetched);
    }
  };

  handleRecipeClick = (recipe) => {
    this.props.fetchRecipeDetails(recipe._id);
    this.setState({
      detailsModalOpen: true,
      recipeOpen: recipe,
    });
  };

  handleEditRecipe = (recipe) => {
    this.props.fetchRecipeDetails(recipe._id);
    this.setState({ recipeOpen: recipe, editModalOpen: true, editMode: true });
  };

  handleDeleteRecipe = (recipeID) => {
    this.props.deleteRecipe(recipeID);
  };

  render() {
    return (
      <>
        <RecipeEditModal
          modalOpen={this.state.editModalOpen}
          toggleModal={() => {
            this.setState({
              editModalOpen: !this.state.editModalOpen,
            });
          }}
          editMode={this.state.editMode}
          recipe={this.state.recipeOpen}
          recipeIngredients={this.props.recipes.recipeIngredients}
          recipePrepSteps={this.props.recipes.recipeSteps}
          loading={this.props.recipes.recipeDetailsLoading}
        />
        <RecipeDetailsModal
          modalOpen={this.state.detailsModalOpen}
          toggle={() =>
            this.setState({ detailsModalOpen: !this.state.detailsModalOpen })
          }
          recipeOpen={this.state.recipeOpen}
        />
        <div className="grocery-container px-4 recipes-list-container">
          <div className="fixed-top">
            <Modal
              isOpen={
                this.props.recipes.addedNewRecipe ||
                this.props.recipes.editedRecipe ||
                this.props.recipes.deletedRecipe
                  ? true
                  : false
              }
            >
              <ModalBody>
                <LottieAnimation />
                <div className="text-center" style={{ fontSize: 20 }}>
                  Recipe{" "}
                  {this.props.recipes.addedNewRecipe
                    ? "Added"
                    : this.props.recipes.deletedRecipe
                    ? "Deleted"
                    : this.props.recipes.editedRecipe
                    ? "Updated"
                    : ""}{" "}
                  Successfully
                </div>
              </ModalBody>
            </Modal>
          </div>

          <div className="row">
            {this.props.recipes.isLoading &&
            !this.props.recipes.categoriesFetched.length ? (
              <>
                <ContentLoader
                  height={500}
                  width={400}
                  speed={2}
                  backgroundColor={"#f0f2f5"}
                  foregroundColor={"white"}
                  className="d-none d-lg-block sticky-menu"
                >
                  {/* menu */}
                  <rect x="3" y="131" rx="5" ry="5" width="320" height="45" />
                  <rect x="3" y="180" rx="5" ry="5" width="320" height="45" />
                  <rect x="3" y="230" rx="5" ry="5" width="320" height="45" />
                  <rect x="3" y="280" rx="5" ry="5" width="320" height="45" />

                  {/* searchbar */}
                  <rect x="261" y="58" rx="5" ry="5" width="60" height="45" />
                  <rect x="46" y="58" rx="5" ry="5" width="210" height="45" />
                  <rect x="3" y="58" rx="5" ry="5" width="38" height="45" />
                </ContentLoader>
              </>
            ) : (
              <RecipeMenu
                recipeCategories={this.props.recipes.categories}
                handleClickMenuItem={this.handleClickMenuItem}
                recipeCategory={this.props.recipes.activeRecipeCategory}
                isLoading={this.props.recipes.isLoading}
              />
            )}

            <div className="col-md-12 col-lg-7 col-xl-8 offset-xl-3 offset-lg-4 pt-lg-5 pl-lg-5">
              {this.props.recipes.isLoading ? (
                <>
                  {this.state.placeholderArray.map((placeholder) => {
                    return (
                      <ContentLoader
                        speed={2}
                        width={"100%"}
                        height={200}
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                        className="col-xl-4 col-md-6 col-12 d-inline-block"
                      >
                        <rect
                          x="48"
                          y="8"
                          rx="3"
                          ry="3"
                          width="88"
                          height="6"
                        />
                        <rect
                          x="48"
                          y="26"
                          rx="3"
                          ry="3"
                          width="52"
                          height="6"
                        />
                        <circle cx="20" cy="20" r="20" />
                        <rect
                          x="196"
                          y="7"
                          rx="3"
                          ry="3"
                          width="52"
                          height="6"
                        />
                        <rect
                          x="5"
                          y="51"
                          rx="0"
                          ry="0"
                          width="100%"
                          height="60%"
                        />
                      </ContentLoader>
                    );
                  })}
                </>
              ) : (
                <div className="row" style={{ marginTop: 20 }}>
                  {this.props.recipes.filteredRecipes.map((recipe) => {
                    return (
                      <RecipeCard
                        handleDeleteRecipe={this.handleDeleteRecipe}
                        handleRecipeClick={() => this.handleRecipeClick(recipe)}
                        key={recipe._id}
                        recipe={recipe}
                        user={this.props.auth.user}
                        handleEditRecipe={() => this.handleEditRecipe(recipe)}
                      />
                    );
                  })}
                  <div
                    className="col-xl-4 col-md-6 col-12 p-2  hvr-grow"
                    onClick={() =>
                      this.setState({
                        editModalOpen: !this.state.editModalOpen,
                        editMode: false,
                      })
                    }
                  >
                    <div className="recipe-card-add-container">
                      <div>
                        <img
                          className="w-100"
                          src="https://delo-vcusa.ru/lazy-load-placeholder.png"
                          alt="Breadcrumb Trail Campground"
                        />
                      </div>
                      <div className="recipe-add-title">
                        + Create New Recipe
                      </div>
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
