import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setSearchActive,
  filterGroceries,
  handleChangeNewGrocery,
  handleChooseGrocery,
  handleSubmitNewGrocery,
  viewAllGroceryInstances,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    groceries: state.groceries,
    groceryCategories: state.groceryCategories,
    groceryInstances: state.groceryInstances,
  };
};

const mapDispatchToProps = {
  setSearchActive: (value) => setSearchActive(value),
  filterGroceries: (value) => filterGroceries(value),
  handleChangeNewGrocery: (value) => handleChangeNewGrocery(value),
  handleChooseGrocery: (grocery, ref) => handleChooseGrocery(grocery, ref),
  handleSubmitNewGrocery: (grocery, ref) =>
    handleSubmitNewGrocery(grocery, ref),
  viewAllGroceryInstances: (grocery) => viewAllGroceryInstances(grocery),
};

class SearchBar extends Component {
  state = {
    matchedSearchValue: null,
  };

  render() {
    const handleActivateSearch = (v) => {
      this.props.setSearchActive(v);
    };
    const handleChangeNewGrocery = (e) => {
      this.props.handleChangeNewGrocery(e.target.value);
      this.props.filterGroceries(e.target.value);
      this.setState({
        matchedSearchValue: this.props.groceries.filteredGroceries.filter(
          (g) => g.name.toLowerCase() === e.target.value.toLowerCase()
        )[0],
      });
    };
    const handleSearchClick = (e) => {
      if (e.code === "Enter") {
        if (this.state.matchedSearchValue) {
          if (this.props.recipeEditMode) {
            this.props.setNewGroceryIngredientSelected(
              this.state.matchedSearchValue
            );
            handleActivateSearch(false);
          } else
            this.props.handleSubmitNewGrocery(
              this.state.matchedSearchValue,
              this.props.groceryInstances.refObj
            );

          handleChangeNewGrocery({ target: { value: "" } });
        }
        if (this.props.groceries.filteredGroceries.length === 1) {
          if (this.props.recipeEditMode) {
            this.props.setNewGroceryIngredientSelected(
              this.props.groceries.filteredGroceries[0]
            );
            handleActivateSearch(false);
          } else
            this.props.handleSubmitNewGrocery(
              this.props.groceries.filteredGroceries[0],
              this.props.groceryInstances.refObj
            );

          handleChangeNewGrocery({ target: { value: "" } });
        }
      } else if (e.code === "Escape") {
        handleChangeNewGrocery({ target: { value: "" } });
        handleActivateSearch(false);
      } else {
        handleActivateSearch(true);
      }
    };

    const handleViewAllClick = (grocery) => {
      this.props.viewAllGroceryInstances(grocery);
    };
    return (
      <div className="input-group ing-search-container mb-2">
        {console.log("GROCERIESSSAA", this.props.groceries)}
        <label for="ingredient2" className="input-group-prepend">
          <span
            className="input-group-text ingredient-search bg-ing"
            id="basic-addon1"
          >
            <i className="fa fa-search ml-auto hvr-grow"></i>
          </span>
        </label>

        {this.props.recipeEditMode && this.props.newIngredientSelected.name ? (
          <div className="selected-new-ingredient">
            {this.props.newIngredientSelected.name}{" "}
            <span
              onClick={() => {
                this.props.removeNewGroceryIngredientSelected();
                handleChangeNewGrocery({ target: { value: "" } });
                handleActivateSearch(true);
              }}
              className="remove-selected-new-ingredient"
            >
              x
            </span>
          </div>
        ) : null}
        <input
          autocomplete="off"
          onClick={() => {
            if (
              this.props.newIngredientSelected &&
              this.props.newIngredientSelected.name
            ) {
            } else handleActivateSearch(true);
          }}
          id="ingredient2"
          type="text"
          className="form-control ingredient-search ingredient-search-input"
          placeholder={
            this.props.recipeEditMode
              ? this.props.newIngredientSelected.name
                ? ""
                : "Search for Ingredient"
              : "Search for Ingredient"
          }
          value={this.props.groceries.newGroceryName}
          onChange={handleChangeNewGrocery}
          onKeyDown={(e) => handleSearchClick(e)}
        ></input>

        <div
          className="input-group-append"
          onClick={
            this.state.matchedSearchValue ||
            this.props.groceries.filteredGroceries.length === 1
              ? () =>
                  this.props.handleSubmitNewGrocery(
                    this.state.matchedSearchValue
                      ? this.state.matchedSearchValue
                      : this.props.groceries.filteredGroceries[0]
                  )
              : null
          }
        >
          {this.props.recipeEditMode ? null : (
            <a
              className={`btn btn-ing-search ingredient-search ${
                this.state.matchedSearchValue ||
                this.props.groceries.filteredGroceries.length === 1
                  ? ""
                  : "btn-ing-search-inactive"
              }`}
            >
              <span className="d-flex button-ing-text">+ Add</span>
            </a>
          )}
        </div>
        {this.props.groceries.searchActive ? (
          <>
            {this.props.groceries.isLoading ? (
              <div className="search-box">Loading...</div>
            ) : (
              <div
                className={`search-box ${
                  this.props.recipeEditMode && "search-box-recipe-modal"
                }`}
              >
                <div className="search-close-cont">
                  <div
                    className="search-close"
                    onClick={() => handleActivateSearch(false)}
                  >
                    x
                  </div>
                </div>

                {this.props.groceryCategories.groceryCategories.map((cat) => {
                  return (
                    <div>
                      {this.props.groceries.filteredGroceries.filter(
                        (g) => g.category._id == cat._id
                      ).length ? (
                        <div className="search-cat">{cat.name}</div>
                      ) : null}
                      {this.props.groceries.filteredGroceries
                        .filter((grocery) => grocery.category._id === cat._id)
                        .map((g) => {
                          return (
                            <div className="mb-1 pb-2 ml-1 border-bottom added-item d-flex">
                              <span
                                onClick={() => {
                                  if (this.props.recipeEditMode) {
                                    this.props.setNewGroceryIngredientSelected(
                                      g
                                    );
                                    handleActivateSearch(false);
                                    handleChangeNewGrocery({
                                      target: { value: "" },
                                    });
                                  } else
                                    this.props.handleChooseGrocery(
                                      g,
                                      this.props.groceryInstances.refObj
                                    );
                                }}
                              >
                                {this.props.recipeEditMode ? " " : "+"} {g.name}{" "}
                              </span>

                              {this.props.groceryInstances.groceryInstances.filter(
                                (gI) => gI.grocery._id === g._id
                              ).length && !this.props.recipeEditMode ? (
                                <>
                                  <span className="grocery-search-qty">
                                    -{" "}
                                    {
                                      this.props.groceryInstances.groceryInstances.filter(
                                        (gI) => gI.grocery._id === g._id
                                      ).length
                                    }{" "}
                                    in list
                                  </span>

                                  {this.props.groceryInstances
                                    .groceryInstanceToFilter ? (
                                    this.props.groceryInstances
                                      .groceryInstanceToFilter._id === g._id ? (
                                      <div
                                        className="ml-auto d-flex filter-active-container"
                                        onClick={() => handleViewAllClick(null)}
                                      >
                                        <div className="mr-2">Reset</div>
                                        <i
                                          className="fa fa-times  hvr-grow mr-2 mt-1"
                                          style={{ color: "#7ca982" }}
                                        ></i>
                                      </div>
                                    ) : (
                                      <div
                                        className="ml-auto"
                                        onClick={() => handleViewAllClick(g)}
                                      >
                                        <i
                                          className="fa fa-eye  hvr-grow mr-1"
                                          style={{ color: "#7ca982" }}
                                        ></i>
                                        <span
                                          className="mr-1"
                                          style={{ color: "#7ca982" }}
                                        >
                                          View{" "}
                                          <span
                                            style={{
                                              opacity:
                                                this.props.groceryInstances.groceryInstances.filter(
                                                  (gI) =>
                                                    gI.grocery._id === g._id
                                                ).length > 1
                                                  ? 1
                                                  : 0,
                                            }}
                                          >
                                            all
                                          </span>
                                        </span>
                                      </div>
                                    )
                                  ) : (
                                    <div
                                      className="ml-auto"
                                      onClick={() => handleViewAllClick(g)}
                                    >
                                      <i
                                        className="fa fa-eye  hvr-grow mr-1"
                                        style={{ color: "#7ca982" }}
                                      ></i>
                                      <span
                                        className="mr-1"
                                        style={{ color: "#7ca982" }}
                                      >
                                        View{" "}
                                        <span
                                          style={{
                                            opacity:
                                              this.props.groceryInstances.groceryInstances.filter(
                                                (gI) => gI.grocery._id === g._id
                                              ).length > 1
                                                ? 1
                                                : 0,
                                          }}
                                        >
                                          all
                                        </span>
                                      </span>
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
