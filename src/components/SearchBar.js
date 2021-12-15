import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setSearchActive,
  filterGroceries,
  handleChangeNewGrocery,
  handleChooseGrocery,
  handleSubmitNewGrocery,
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
          this.props.handleSubmitNewGrocery(
            this.state.matchedSearchValue,
            this.props.groceryInstances.refObj
          );
          handleChangeNewGrocery({ target: { value: "" } });
        }
        if (this.props.groceries.filteredGroceries.length === 1) {
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
    return (
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
          autocomplete="off"
          onClick={() => handleActivateSearch(true)}
          id="ingredient2"
          type="text"
          className="form-control ingredient-search ingredient-search-input"
          placeholder="Search for Ingredient"
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
        </div>
        {this.props.groceries.searchActive ? (
          <>
            {this.props.groceries.isLoading ? (
              <div className="search-box">Loading...</div>
            ) : (
              <div className="search-box">
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
                        (g) => g.category.id == cat.id
                      ).length ? (
                        <div className="search-cat">{cat.name}</div>
                      ) : null}
                      {this.props.groceries.filteredGroceries
                        .filter((grocery) => grocery.category.id === cat.id)
                        .map((g) => {
                          return (
                            <div
                              onClick={() =>
                                this.props.handleChooseGrocery(
                                  g,
                                  this.props.groceryInstances.refObj
                                )
                              }
                              className="mb-1 pb-2 ml-1 border-bottom added-item"
                            >
                              {g.name}
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
