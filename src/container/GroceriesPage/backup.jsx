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
    value={this.props.newGroceryName}
    onChange={handleChangeNewGrocery}
    onKeyDown={(e) => handleSearchClick(e)}
  ></input>
  <div
    className="input-group-append"
    onClick={
      this.state.matchedSearchValue || this.props.groceriesList.length === 1
        ? () =>
            this.props.handleSubmitNewGrocery(
              this.state.matchedSearchValue
                ? this.state.matchedSearchValue
                : this.props.groceriesList[0]
            )
        : null
    }
  >
    <a
      className={`btn btn-ing-search ingredient-search ${
        this.state.matchedSearchValue || this.props.groceriesList.length === 1
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
                {this.props.groceriesList.filter((g) => g.category.id == cat.id)
                  .length ? (
                  <div className="search-cat">{cat.name}</div>
                ) : null}
                {this.props.groceriesList
                  .filter((grocery) => grocery.category.id === cat.id)
                  .map((g) => {
                    return (
                      <div
                        onClick={() => this.props.handleChooseGrocery(g)}
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
</div>;
