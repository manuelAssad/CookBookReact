import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchGroceryInstances = () => (dispatch) => {
  dispatch(unSetShouldRefetch());
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

export const viewAllGroceryInstances = (groceryInstance) => (dispatch) => {
  dispatch(viewAllGroceryInstances1(groceryInstance));
  if (window.innerWidth < 992) dispatch(setSearchActive(false));
};

export const viewAllGroceryInstances1 = (groceryInstance) => ({
  type: ActionTypes.VIEW_ALL_GROCERY_INSTANCES,
  payload: groceryInstance,
});

export const crossOutGroceryInstanceInServer =
  (groceryInstance) => (dispatch) => {
    const newGroceryInstances = {
      ...groceryInstance,
      crossed: !groceryInstance.crossed,
    };

    dispatch(crossOutGroceryInstance(groceryInstance.id));

    return fetch(baseUrl + `grocery-instances/${groceryInstance.id}`, {
      method: "PUT",
      body: JSON.stringify(newGroceryInstances),
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
      .catch((error) => {
        alert("Your grocery could not be crossed\nError: " + error.message);
      });
  };

export const updatedGroceryInstanceDetail =
  (groceryInstance, detail) => (dispatch) => {
    const newGroceryInstance = {
      ...groceryInstance,
      detail: detail,
      updatingDetailStatus: false,
    };
    dispatch(shouldUpdatedGroceryInstanceDetail(newGroceryInstance));

    return fetch(baseUrl + `grocery-instances/${groceryInstance.id}`, {
      method: "PUT",
      body: JSON.stringify(newGroceryInstance),
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
      .then((groceryInstance) =>
        dispatch(successfullyUpdatedGroceryInstanceDetail(groceryInstance))
      )
      .catch((error) => {
        dispatch(failedUpdatingGroceryDetail(groceryInstance));
      });
  };

export const shouldUpdatedGroceryInstanceDetail = (groceryInstance) => ({
  type: ActionTypes.SHOULD_UPDATE_GROCERY_INSTANCE_DETAIL,
  payload: groceryInstance,
});

export const successfullyUpdatedGroceryInstanceDetail = (groceryInstance) => ({
  type: ActionTypes.SUCCESS_UPDATE_GROCERY_INSTANCE_DETAIL,
  payload: groceryInstance,
});

export const failedUpdatingGroceryDetail = (groceryInstance) => ({
  type: ActionTypes.GROCERY_INSTANCE_DETAIL_FAILED,
  payload: groceryInstance,
});

export const crossOutGroceryInstance = (id) => ({
  type: ActionTypes.CROSS_OUT_GROCERY_INSTANCE,
  payload: id,
});

export const removeGroceryInstance = (id) => ({
  type: ActionTypes.DELETE_GROCERY_INSTANCE,
  payload: id,
});

export const deleteGroceryInstance = (id) => (dispatch) => {
  dispatch(removeGroceryInstance(id));

  return fetch(baseUrl + `grocery-instances/${id}`, {
    method: "DELETE",
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
    .catch((error) => {
      alert("Your grocery could not be crossed\nError: " + error.message);
    });
};

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

export const fetchRecipeDetails = (id) => (dispatch) => {
  dispatch(fetchRecipeIngredients(id));
  dispatch(fetchRecipeSteps(id));
};

export const fetchRecipeIngredients = (id) => (dispatch) => {
  dispatch(recipeIngredientsLoading());
  return fetch(baseUrl + `recipe-ingredients?recipe=${id}`)
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
    .then((ingredients) => dispatch(addRecipeIngredients(ingredients)))
    .catch((error) => dispatch(recipeIngredientsFailed(error.message)));
};

export const fetchRecipeSteps = (id) => (dispatch) => {
  dispatch(recipeStepsLoading());
  return fetch(baseUrl + `recipe-steps?recipe=${id}`)
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
    .then((steps) => dispatch(addRecipeSteps(steps)))
    .catch((error) => dispatch(recipeStepsFailed(error.message)));
};

export const recipeIngredientsLoading = () => ({
  type: ActionTypes.RECIPE_INGREDIENTS_LOADING,
});

export const recipeIngredientsFailed = () => ({
  type: ActionTypes.RECIPE_INGREDIENTS_FAILED,
});

export const addRecipeIngredients = (ingredients) => ({
  type: ActionTypes.ADD_RECIPE_INGREDIENTS,
  payload: ingredients,
});

export const recipeStepsLoading = () => ({
  type: ActionTypes.RECIPE_STEPS_LOADING,
});

export const recipeStepsFailed = () => ({
  type: ActionTypes.RECIPE_STEPS_FAILED,
});

export const addRecipeSteps = (steps) => ({
  type: ActionTypes.ADD_RECIPE_STEPS,
  payload: steps,
});

export const addIngredientToList = (ingredient) => (dispatch) => {
  dispatch(shouldAddIngredientToList(ingredient.id));

  const newGrocery = {
    grocery: ingredient.grocery,
    custom_image: null,
    detail: ingredient.detail,
    user: 0,
    timestamp: Date.now(),
  };
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
    .then((response) => {
      dispatch(addIngredientsProcedure(ingredient.id));
    })
    .catch((error) => {
      dispatch(failedAddIngredientToList(ingredient.id));
    });
};

export const shouldAddIngredientToList = (id) => ({
  type: ActionTypes.SHOULD_ADD_INGREDIENT_TO_LIST,
  payload: id,
});

export const addIngredientsProcedure = (id) => (dispatch) => {
  dispatch(successfullyAddIngredientToList(id));
};

export const successfullyAddIngredientToList = (id) => ({
  type: ActionTypes.SUCCESSFULLY_ADDED_INGREDIENT_TO_LIST,
  payload: id,
});

export const unSetShouldRefetch = () => ({
  type: ActionTypes.UNSET_REFETCH,
});

export const failedAddIngredientToList = (id) => ({
  type: ActionTypes.FAILED_ADDING_INGREDIENT_TO_LIST,
  payload: id,
});

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
