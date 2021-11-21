import React, { Component } from 'react';

//Components
import HomePage from "./Hompage"
import Recipes from './RecipesPage';
import Groceries from './GroceriesPage';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  render() {
      return (
        <div>
            <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/groceries' component={Groceries}/>
                    <Route exact path='/recipes' component={Recipes}/>
                    <Redirect to='/home' />
                </Switch>
            <Footer />
        </div>      
      );
    }
}

export default Main;