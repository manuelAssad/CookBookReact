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
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    groceryInstances: state.groceryInstances,
    groceryCategories: state.groceryCategories,
  };
};

const mapDispatchToProps = {
  fetchGroceryInstances: () => fetchGroceryInstances(),
  fetchGroceryCategories: () => fetchGroceryCategories(),
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSection: 0,
    };
  }

  componentDidMount() {
    this.props.fetchGroceryInstances();
    this.props.fetchGroceryCategories();
  }

  handleSectionChange = (section) => {
    this.setState({ currentSection: section });
  };

  render() {
    const GroceriesComponent = () => {
      return (
        <Groceries
          groceryInstances={this.props.groceryInstances.groceryInstances}
          groceryInstancesLoading={this.props.groceryInstances.isLoading}
          groceryInstancesErrMess={this.props.groceryInstances.errMess}
          groceryCategories={this.props.groceryCategories.groceryCategories}
          groceryCategoriesLoading={this.props.groceryCategories.isLoading}
          groceryCategoriesErrMess={this.props.groceryCategories.errMess}
        />
      );
    };

    return (
      <div>
        <Header
          currentSection={this.state.currentSection}
          handleSectionChange={this.handleSectionChange}
        />
        <Switch>
          <Route
            path="/home"
            render={() => (
              <HomePage handleSectionChange={this.handleSectionChange} />
            )}
          />
          <Route exact path="/groceries" component={GroceriesComponent} />
          <Route exact path="/recipes" component={Recipes} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
