import React, { Component } from "react";

import { connect } from "react-redux";

import { setSearchActive, filterGroceries } from "../../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    groceries: state.groceries,
  };
};

const mapDispatchToProps = {
  setSearchActive: (value) => setSearchActive(value),
  filterGroceries: (value) => filterGroceries(value),
};

class GroceryMenu extends Component {
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
      console.log(
        "NEWWWWWW",
        this.props.groceriesList.filter(
          (g) => g.name.toLowerCase() === e.target.value.toLowerCase()
        )[0]
      );
      this.setState({
        matchedSearchValue: this.props.groceriesList.filter(
          (g) => g.name.toLowerCase() === e.target.value.toLowerCase()
        )[0],
      });
    };

    const handleSearchClick = (e) => {
      if (e.code === "Enter") {
        if (this.state.matchedSearchValue)
          this.props.handleSubmitNewGrocery(this.state.matchedSearchValue);
        if (this.props.groceriesList.length === 1)
          this.props.handleSubmitNewGrocery(this.props.groceriesList[0]);
        handleChangeNewGrocery({ target: { value: "" } });
      }
    };
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
              autocomplete="off"
              onClick={() => handleActivateSearch(true)}
              ref={(input) => {
                this.nameInput = input;
              }}
              id="ingredient2"
              type="text"
              className="form-control ingredient-search ingredient-search-input"
              placeholder="Search for Ingredient"
              value={this.props.newGroceryName}
              onChange={handleChangeNewGrocery}
              onKeyDown={(e) => handleSearchClick(e)}
            ></input>
            <div
              className="input-group-append"
              onClick={
                this.state.matchedSearchValue
                  ? () =>
                      this.props.handleSubmitNewGrocery(
                        this.state.matchedSearchValue
                      )
                  : null
              }
            >
              <a
                className={`btn btn-ing-search ingredient-search ${
                  this.state.matchedSearchValue ||
                  this.props.groceriesList.length === 1
                    ? ""
                    : "btn-ing-search-inactive"
                }`}
              >
                <span className="d-flex button-ing-text">+ Add</span>
              </a>
            </div>
            {this.props.groceries.searchActive ? (
              <>
                {this.props.groceriesLoading ? (
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
                    {/* <div className="search-cat">Suggested Items</div>
              <div className="mb-1 pb-2 ml-1 border-bottom">Bread</div>
              <div className="mb-1 pb-2 ml-1 border-bottom">Jam</div>
              <div className="mb-1 pb-2 ml-1 border-bottom">Honey</div>
              <div className="mb-1 pb-2 ml-1 border-bottom">Tomatoes</div>
              <div className="mb-1 pb-2 ml-1 border-bottom">Apples</div> */}

                    {this.props.groceryCategories.map((cat) => {
                      return (
                        <div>
                          {this.props.groceriesList.filter(
                            (g) => g.category.id == cat.id
                          ).length ? (
                            <div className="search-cat">{cat.name}</div>
                          ) : null}
                          {this.props.groceriesList
                            .filter((grocery) => grocery.category.id === cat.id)
                            .map((g) => {
                              return (
                                <div
                                  onClick={() =>
                                    this.props.handleChooseGrocery(g)
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
          {console.log(this.props.groceryInstances, "INSTAANCEEESS")}
          {!this.props.groceries.searchActive ? (
            <>
              {this.props.groceryCategories.map((cat, i) => {
                return (
                  <>
                    {this.props.groceryInstances.filter(
                      (g) => g.grocery.category === cat.id
                    ).length ? (
                      <a
                        key={cat.id}
                        className={`list-group-item list-group-item-action ${
                          this.props.activeCat === cat.id ? "active" : ""
                        }`}
                        onClick={() =>
                          this.props.handleClickCategory(
                            cat.id,
                            this.props.groceryCategories[i + 1].id
                          )
                        }
                      >
                        {cat.name}
                      </a>
                    ) : null}
                  </>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroceryMenu);
