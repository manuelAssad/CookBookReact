import { createStore, combineReducers, applyMiddleware } from "redux";

import { GroceryInstances } from "./groceryInstances";
import { GroceryCategories } from "./groceryCategories";
import { Recipes } from "./recipes";
import { Groceries } from "./groceries";
import { Auth } from "./auth";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { createForms } from "react-redux-form";
import { InitialRecipeDetails } from "./recipeDetailsForm";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      groceryInstances: GroceryInstances,
      groceryCategories: GroceryCategories,
      recipes: Recipes,
      groceries: Groceries,
      auth: Auth,
      ...createForms({
        recipeForm: InitialRecipeDetails,
      }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
