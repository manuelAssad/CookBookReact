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

export const postGrocery = (grocery, addingAgain) => (dispatch) => {
  let newGrocery = null;
  if (!addingAgain) {
    newGrocery = {
      grocery: {
        ...grocery,
        category: grocery.category.id,
      },
      custom_image: null,
      detail: "",
      user: 0,
      timestamp: Date.now(),
    };
  } else {
    newGrocery = grocery;
  }

  if (!addingAgain) dispatch(addNewGrocery(newGrocery));
  else dispatch(addingGroceryAgain(grocery));

  return fetch(baseUrl + `grocery-instances${addingAgain ? "" : "s"}`, {
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
    .catch(() => {
      dispatch(addNewGroceryFailed(newGrocery));
    });
};

export const addingGroceryAgain = (grocery) => ({
  type: ActionTypes.ADD_NEW_GROCERY_AGAIN,
  payload: grocery,
});

export const addNewGroceryFailed = (newGrocery) => ({
  type: ActionTypes.ADD_NEW_GROCERY_FAILED,
  payload: newGrocery,
});

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

  return fetch(baseUrl + "groceries", {
    method: "OPTIONS",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          console.log("GROCERIESS", response);
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

export const handleChooseGrocery = (grocery) => (dispatch) => {
  dispatch(handleSectionChange(grocery.category.id));
  if (window.innerWidth < 992) dispatch(setSearchActive(false));
  dispatch(postGrocery(grocery));
};

export const handleSubmitNewGrocery = (grocery) => (dispatch) => {
  dispatch(handleSectionChange(grocery.category.id));
  if (window.innerWidth < 992) dispatch(setSearchActive(false));
  dispatch(postGrocery(grocery));
};

export const setHistory = (history) => ({
  type: ActionTypes.SET_HISTORY,
  payload: history,
});

export const handlePauseDetection = () => (dispatch) => {
  dispatch(pauseDetection());
  setTimeout(() => {
    dispatch(resumeDetection());
  }, 600);
};

export const pauseDetection = () => ({
  type: ActionTypes.PAUSE_DETECTION,
});

export const resumeDetection = () => ({
  type: ActionTypes.RESUME_DETECTION,
});

export const postRecipeIngredient =
  (grocery, note, position, recipeId) => (dispatch) => {
    const newRecipeIngredient = {
      recipe: recipeId,
      grocery: grocery,
      detail: note,
      position: position,
    };

    dispatch(addRecipeIngredient(newRecipeIngredient));
  };

export const addRecipeIngredient = (recipeIngredient) => ({
  type: ActionTypes.ADD_RECIPE_INGREDIENT,
  payload: recipeIngredient,
});

export const deleteRecipeIngredient = (index) => ({
  type: ActionTypes.DELETE_RECIPE_INGREDIENT,
  payload: index,
});

export const setIngredientToEdit = (ingredient) => ({
  type: ActionTypes.SET_INGREDIENT_TO_EDIT,
  payload: ingredient,
});

export const editIngredient = (grocery, note, position) => ({
  type: ActionTypes.EDIT_INGREDIENT,
  payload: {
    recipe: null,
    grocery: grocery,
    detail: note,
    position: position,
  },
});

export const updateIngredientsList = (ingredients) => ({
  type: ActionTypes.UPGRADE_INGREDIENTS_LIST,
  payload: ingredients,
});

export const updatePrepStepsList = (prepSteps) => ({
  type: ActionTypes.UPGRADE_PREP_STEPS_LIST,
  payload: prepSteps,
});

export const addPrepStep = (prepStep) => ({
  type: ActionTypes.ADD_PREP_STEP,
  payload: prepStep,
});

export const deletePrepStep = (index) => ({
  type: ActionTypes.DELETE_PREP_STEP,
  payload: index,
});

export const setPrepStepToEdit = (prepStep) => ({
  type: ActionTypes.SET_PREP_STEP_TO_EDIT,
  payload: prepStep,
});

export const editPrepStep = (title, description, position) => ({
  type: ActionTypes.EDIT_PREP_STEP,
  payload: {
    title,
    description,
    position,
  },
});

export const changeRecipeCategory = (category) => ({
  type: ActionTypes.CHANGE_RECIPE_CATEGORY,
  payload: category,
});

export const addNewRecipe = (newRecipeDetails) => (dispatch) => {
  console.log("DETAILSSS", newRecipeDetails);

  const newRecipe = {
    id: 0,
    owner: {
      name: "Manuel Assad",
      avatar: null,
    },
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/5/11/0/FNK_Pesto-Lasagna-Rolls-H_s4x3.jpg.rend.hgtvcom.966.725.suffix/1494520429705.jpeg",
    image_detail:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/5/11/0/FNK_Pesto-Lasagna-Rolls-H_s4x3.jpg.rend.hgtvcom.966.725.suffix/1494520429705.jpeg",
    title: "Main Course 1",
    servings: 2,
    cook_time: 20,
    prep_time: 45,
    recipe_category: {
      name: "Main Courses",
      id: 0,
      user: null,
    },
  };
};
