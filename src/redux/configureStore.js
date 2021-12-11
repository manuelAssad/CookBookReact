import { createStore, combineReducers, applyMiddleware } from "redux";

import { GroceryInstances } from "./groceryInstances";
import { GroceryCategories } from "./groceryCategories";
import { Recipes } from "./recipes";
import { Groceries } from "./groceries";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      groceryInstances: GroceryInstances,
      groceryCategories: GroceryCategories,
      recipes: Recipes,
      groceries: Groceries,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
