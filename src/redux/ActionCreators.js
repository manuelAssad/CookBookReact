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

export const handleClickCategory = (id, ref) => ({
  type: ActionTypes.CLICK_CATEGORY,
  payload: id,
  ref,
});

export const handleSectionChange = (categoryId) => ({
  type: ActionTypes.CATEGORY_SECTION_CHANGE,
  payload: categoryId,
});

export const fetchRecipes = (id, categoriesFetched) => (dispatch) => {
  console.log(categoriesFetched, id, "categoriesFetchedcategoriesFetched");

  //if fetched a certain category or all categories don't fetch again
  if (categoriesFetched.includes(id) || categoriesFetched.includes("all")) {
    // just filter if fetched before
    dispatch(filterRecipes(id));
  } else {
    dispatch(setRecipeCategoriesFetched(id));
    dispatch(recipesLoading());
    return fetch(
      baseUrl + `recipes${id !== null ? `?recipe_category.id=${id}` : ""}`
    )
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
      .then((recipes) => dispatch(addRecipes(recipes, id)))
      .catch((error) => dispatch(recipesFailed(error.message)));
  }
};

export const filterRecipes = (id) => ({
  type: ActionTypes.FILTER_RECIPES,
  payload: id,
});

export const setRecipeCategoriesFetched = (id) => ({
  type: ActionTypes.SET_RECIPES_CATEGORIES_FETCHED,
  payload: id,
});

export const recipesLoading = () => ({
  type: ActionTypes.RECIPES_LOADING,
});

export const recipesFailed = (errMess) => ({
  type: ActionTypes.RECIPES_FAILED,
  payload: errMess,
});

export const addRecipes = (recipes, category) => ({
  type: ActionTypes.ADD_RECIPES,
  payload: recipes,
  category,
});

export const setRecipeCategory = (cat) => ({
  type: ActionTypes.SET_RECIPE_CATEGORY,
  payload: cat,
});

export const createRef = () => ({
  type: ActionTypes.CREATE_REF,
});

export const addNewGrocery = (grocery) => ({
  type: ActionTypes.ADD_NEW_GROCERY,
  payload: grocery,
});

export const modifyNewGrocery = (grocery) => ({
  type: ActionTypes.MODIFY_NEW_GROCERY,
  payload: grocery,
});

export const postGrocery = (grocery) => (dispatch) => {
  const newGrocery = {
    grocery: {
      ...grocery,
      category: grocery.category.id,
    },
    custom_image: null,
    detail: "",
    user: 0,
    timestamp: Date.now(),
  };
  dispatch(addNewGrocery(newGrocery));

  return fetch(baseUrl + "grocery-instances", {
    method: "POST",
    body: JSON.stringify(newGrocery),
    headers: {
      "Content-Type": "application/json",
    },
  })
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
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(modifyNewGrocery(response)))
    .catch((error) => {
      alert("Your grocery could not be posted\nError: " + error.message);
    });
};

export const groceriesLoading = () => ({
  type: ActionTypes.GROCERY_INSTANCES_LOADING,
});

export const groceriesFailed = (errMess) => ({
  type: ActionTypes.GROCERIES_FAILED,
  payload: errMess,
});

export const addGroceries = (groceries) => ({
  type: ActionTypes.ADD_GROCERIES,
  payload: groceries,
});

export const filterGroceries = (value) => ({
  type: ActionTypes.FILTER_GROCERIES,
  payload: value,
});

export const fetchGroceries = () => (dispatch) => {
  dispatch(groceriesLoading());

  return fetch(baseUrl + "groceries")
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
    .then((groceries) => dispatch(addGroceries(groceries)))
    .catch((error) => dispatch(groceriesFailed(error.message)));
};

export const setSearchActive = (value) => ({
  type: ActionTypes.SET_SEARCH_ACTIVE,
  payload: value,
});

export const handleChangeNewGrocery = (v) => ({
  type: ActionTypes.CHANGE_GROCERY_SEARCH_VALUE,
  payload: v,
});

export const handleChooseGrocery = (grocery, ref) => (dispatch) => {
  dispatch(handleSectionChange(grocery.category.id));
  if (window.innerWidth < 992) dispatch(setSearchActive(false));
  dispatch(postGrocery(grocery, ref));
};

export const handleSubmitNewGrocery = (grocery, ref) => (dispatch) => {
  dispatch(handleSectionChange(grocery.category.id));
  if (window.innerWidth < 992) dispatch(setSearchActive(false));
  dispatch(postGrocery(grocery, ref));
};

export const setHistory = (history) => ({
  type: ActionTypes.SET_HISTORY,
  payload: history,
});
