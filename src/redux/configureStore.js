import { createStore, combineReducers, applyMiddleware } from "redux";

import { GroceryInstances } from "./groceryInstances";
import { GroceryCategories } from "./groceryCategories";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      groceryInstances: GroceryInstances,
      groceryCategories: GroceryCategories,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
