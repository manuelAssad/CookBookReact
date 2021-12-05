import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchGroceryInstances = () => (dispatch) => {
  dispatch(groceryInstancesLoading());

  return fetch(baseUrl + "grocery-instances")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((groceryInstances) => dispatch(addGroceryInstances(groceryInstances)))
    .catch((error) => dispatch(groceryInstancesFailed(error.message)));
};

export const groceryInstancesLoading = () => ({
  type: ActionTypes.GROCERY_INSTANCES_LOADING,
});

export const groceryInstancesFailed = (errMess) => ({
  type: ActionTypes.GROCERY_INSTANCES_FAILED,
  payload: errMess,
});

export const addGroceryInstances = (groceryInstances) => ({
  type: ActionTypes.ADD_GROCERY_INSTANCES,
  payload: groceryInstances,
});

export const fetchGroceryCategories = () => (dispatch) => {
  dispatch(groceryCategoriesLoading());

  return fetch(baseUrl + "grocery-categories")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((groceryCategories) =>
      dispatch(addGroceryCategories(groceryCategories))
    )
    .catch((error) => dispatch(groceryCategoriesFailed(error.message)));
};

export const groceryCategoriesLoading = () => ({
  type: ActionTypes.GROCERY_CATEGORIES_LOADING,
});

export const groceryCategoriesFailed = (errMess) => ({
  type: ActionTypes.GROCERY_CATEGORIES_FAILED,
  payload: errMess,
});

export const addGroceryCategories = (groceryCategories) => ({
  type: ActionTypes.ADD_GROCERY_CATEGORIES,
  payload: groceryCategories,
});
