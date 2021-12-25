import React, { Component } from "react";

import { connect } from "react-redux";

import {
  setSearchActive,
  filterGroceries,
  handleClickCategory,
  viewAllGroceryInstances,
} from "../../redux/ActionCreators";

import OutsideClickHandler from "react-outside-click-handler";

import SearchBar from "../../components/SearchBar";

import { Fade } from "react-animation-components";
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
  handleClickCategory: (id, ref) => handleClickCategory(id, ref),
  viewAllGroceryInstances: (grocery) => viewAllGroceryInstances(grocery),
};

class GroceryMenu extends Component {
  state = {
    matchedSearchValue: null,
  };
  render() {
    const handleActivateSearch = (v) => {
      if (window.innerWidth > 991) this.props.setSearchActive(v);
    };

    return (
      <Fade
        in
        className="d-none d-lg-block col-lg-4 col-xl-3 py-5 sticky-menu "
      >
        <div className="list-group">
          <OutsideClickHandler
            onOutsideClick={() => {
              handleActivateSearch(false);
            }}
          >
            <SearchBar />
          </OutsideClickHandler>

          {!this.props.groceries.searchActive ? (
            this.props.groceryInstanceToFilter ? (
              <div className="d-flex">
                Filtering:{" "}
                <span className="ml-2">
                  {this.props.groceryInstanceToFilter.name}
                </span>
                <div
                  className="clear-filter-button"
                  onClick={() => this.props.viewAllGroceryInstances(null)}
                >
                  Clear Filter
                </div>
              </div>
            ) : (
              <>
                {this.props.groceryCategories.groceryCategories.map(
                  (cat, i) => {
                    return (
                      <>
                        {this.props.groceryInstances.groceryInstances.filter(
                          (g) => g.grocery.category === cat.id
                        ).length ? (
                          <a
                            key={cat.id}
                            className={`list-group-item list-group-item-action ${
                              this.props.groceryCategories.activeCat === cat.id
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              this.props.handleClickCategory(
                                cat.id,
                                this.props.groceryInstances.refObj
                              )
                            }
                          >
                            {cat.name}
                          </a>
                        ) : null}
                      </>
                    );
                  }
                )}
              </>
            )
          ) : null}
        </div>
      </Fade>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroceryMenu);
