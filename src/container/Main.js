import React, { Component } from "react";

//Components
import HomePage from "./Hompage";
import Recipes from "./RecipesPage";
import Groceries from "./GroceriesPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchGroceryInstances,
  fetchGroceryCategories,
  fetchRecipeCategories,
  postGrocery,
  createRef,
  fetchGroceries,
  setSearchActive,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    groceryInstances: state.groceryInstances,
    groceryCategories: state.groceryCategories,
    groceries: state.groceries,
  };
};

const mapDispatchToProps = {
  fetchGroceryInstances: () => fetchGroceryInstances(),
  fetchGroceryCategories: () => fetchGroceryCategories(),
  postGrocery: (value) => postGrocery(value),
  createRef: () => createRef(),
  fetchGroceries: () => fetchGroceries(),
  setSearchActive: (value) => setSearchActive(value),
  fetchRecipeCategories: () => fetchRecipeCategories(),
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSection: 0,
    };
  }

  componentDidMount() {
    // this.props.createRef();
    this.props.fetchGroceryInstances();
    this.props.fetchGroceryCategories();
    this.props.fetchGroceries();
    this.props.fetchRecipeCategories();
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  handleScrollSectionChange = (section) => {
    this.setState({ currentSection: section });
  };

  render() {
    return (
      <div>
        <Header
          currentSection={this.state.currentSection}
          handleScrollSectionChange={this.handleScrollSectionChange}
        />
        <Switch>
          <Route
            path="/home"
            render={() => (
              <HomePage
                handleScrollSectionChange={this.handleScrollSectionChange}
              />
            )}
          />
          <Route
            exact
            path="/groceries"
            render={(props) => (
              <Groceries
                groceryInstances={this.props.groceryInstances.groceryInstances}
                groceryInstancesLoading={this.props.groceryInstances.isLoading}
                groceryInstancesErrMess={this.props.groceryInstances.errMess}
                groceryCategories={
                  this.props.groceryCategories.groceryCategories
                }
                groceryCategoriesLoading={
                  this.props.groceryCategories.isLoading
                }
                groceryCategoriesErrMess={this.props.groceryCategories.errMess}
                postGrocery={this.props.postGrocery}
                refObj={this.props.groceryInstances.refObj}
                newCategory={this.props.groceryInstances.newCategory}
                history={props.history}
                groceries={this.props.groceries.filteredGroceries}
                groceriesLoading={this.props.groceries.isLoading}
                groceriesErrMess={this.props.groceries.errMess}
                setSearchActive={this.props.setSearchActive}
                searchActive={this.props.groceries.searchActive}
              />
            )}
          />
          <Route
            exact
            path="/recipes"
            render={(props) => <Recipes history={props.history} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
