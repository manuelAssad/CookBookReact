import React, { Component } from "react";

//Components
import HomePage from "./Hompage";
import Recipes from "./RecipesPage";
import Groceries from "./GroceriesPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSection: 0,
    };
  }

  handleSectionChange = (section) => {
    this.setState({ currentSection: section });
  };

  render() {
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
          <Route exact path="/groceries" component={Groceries} />
          <Route exact path="/recipes" component={Recipes} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
