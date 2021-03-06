import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

const bearer = "Bearer " + localStorage.getItem("token");

export const fetchGroceryInstances = () => (dispatch) => {
  dispatch(unSetShouldRefetch());
  dispatch(groceryInstancesLoading());
  setTimeout(() => {
    return fetch(baseUrl + "grocery-instances", {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            console.log(response, "grocery-instances");
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
      .then((groceryInstances) =>
        dispatch(addGroceryInstances(groceryInstances))
      )
      .catch((error) => dispatch(groceryInstancesFailed(error.message)));
  }, 1000);
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

    dispatch(crossOutGroceryInstance(groceryInstance._id));

    return fetch(baseUrl + `grocery-instances/${groceryInstance._id}`, {
      method: "PUT",
      body: JSON.stringify(newGroceryInstances),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
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

    setTimeout(() => {
      return fetch(baseUrl + `grocery-instances/${groceryInstance._id}`, {
        method: "PUT",
        body: JSON.stringify(newGroceryInstance),
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
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
    }, 1000);
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
      Authorization: bearer,
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

  return fetch(baseUrl + "grocery-categories", {
    headers: {
      Authorization: bearer,
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
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((groceryCategories) => {
      dispatch(addGroceryCategories(groceryCategories));
      dispatch(createRef(groceryCategories));
    })
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

export const fetchRecipeCategories = () => (dispatch) => {
  dispatch(recipeCategoriesLoading());
  return fetch(baseUrl + `recipe-categories`, {
    headers: {
      Authorization: bearer,
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
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((ingredients) => dispatch(addRecipeCategories(ingredients)))
    .catch((error) => dispatch(recipeCategoriesFailed(error.message)));
};

export const addRecipeCategories = (categories) => ({
  type: ActionTypes.ADD_RECIPE_CATEGORIES,
  payload: categories,
});

export const recipeCategoriesFailed = (err) => ({
  type: ActionTypes.RECIPE_CATEGORIES_FAILED,
  payload: err,
});

export const recipeCategoriesLoading = (err) => ({
  type: ActionTypes.RECIPE_CATEGORIES_LOADING,
  payload: err,
});

export const fetchRecipes = (id, categoriesFetched) => (dispatch) => {
  //if fetched a certain category or all categories don't fetch again

  if (categoriesFetched.includes(id) || categoriesFetched.includes("all")) {
    // just filter if fetched before
    dispatch(filterRecipes(id));
  } else {
    dispatch(setRecipeCategoriesFetched(id));
    dispatch(recipesLoading());
    setTimeout(() => {
      return fetch(
        baseUrl + `recipes${id !== null ? `?recipe_category=${id}` : ""}`,
        {
          headers: {
            Authorization: bearer,
          },
        }
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
    }, 1000);
  }
};

export const fetchRecipeDetails = (id) => (dispatch) => {
  dispatch(recipeDetailsLoading());
  setTimeout(() => {
    return fetch(baseUrl + `recipes/${id}`, {
      headers: {
        Authorization: bearer,
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
          const errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((response) => response.json())
      .then((recipe) => {
        console.log(recipe, "RECIPEEE");
        dispatch(addRecipeDetails(recipe));
      })
      .catch((error) => {
        // dispatch(recipeIngredientsFailed(error.message));
      });
  }, 1000);
};

export const addRecipeDetails = (recipe) => ({
  type: ActionTypes.ADD_RECIPE_DETAILS,
  payload: recipe,
});

export const recipeDetailsLoading = () => ({
  type: ActionTypes.RECIPE_DETAILS_LOADING,
});

export const recipeDetailsFailed = () => ({
  type: ActionTypes.RECIPE_DETAILS_FAILED,
});

export const addIngredientToList = (ingredient) => (dispatch) => {
  dispatch(shouldAddIngredientToList(ingredient._id));

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
      Authorization: bearer,
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
      dispatch(addIngredientsProcedure(ingredient._id));
    })
    .catch((error) => {
      dispatch(failedAddIngredientToList(ingredient._id));
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

export const createRef = (cats) => ({
  type: ActionTypes.CREATE_REF,
  payload: cats,
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
        category: grocery.category._id,
      },
      custom_image: null,
      detail: "",
      timestamp: Date.now(),
    };
  } else {
    newGrocery = grocery;
  }

  console.log(newGrocery, "TIMESTAMPTSENT");

  if (!addingAgain) dispatch(addNewGrocery(newGrocery));
  else dispatch(addingGroceryAgain(newGrocery));

  setTimeout(() => {
    return fetch(baseUrl + `grocery-instances`, {
      method: "POST",
      body: JSON.stringify(newGrocery),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
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
        console.log(response, "TIMESTAMPTRECEIVED");
        dispatch(modifyNewGrocery(response));
      })
      .catch(() => {
        dispatch(addNewGroceryFailed(newGrocery));
      });
  }, 1000);
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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
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
  console.log(grocery.category._id, "GROOOOO");
  dispatch(handleSectionChange(grocery.category._id));
  if (window.innerWidth < 992) dispatch(setSearchActive(false));
  dispatch(postGrocery(grocery));
};

export const handleSubmitNewGrocery = (grocery) => (dispatch) => {
  console.log(grocery.category._id, "GROOOOO");
  dispatch(handleSectionChange(grocery.category._id));
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

export const addNewRecipe =
  (newRecipeDetails, toggleModal, resetForm) => (dispatch) => {
    dispatch(addNewRecipeLoading());

    setTimeout(() => {
      return fetch(baseUrl + "recipes", {
        method: "POST",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipeDetails),
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
          dispatch(addNewRecipeToFE(response));
          toggleModal();
          resetForm();

          setTimeout(() => {
            dispatch(dismissAlert());
          }, 2000);
        })
        .catch((error) => {
          dispatch(addNewRecipeFailed());
        });
    }, 1000);
  };

export const deleteRecipe = (recipeID) => (dispatch) => {
  dispatch(deletingRecipeLoading(recipeID));

  setTimeout(() => {
    return fetch(baseUrl + `recipes/${recipeID}`, {
      method: "DELETE",
      headers: {
        Authorization: bearer,
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
        dispatch(deleteRecipeFromFE(response));
        setTimeout(() => {
          dispatch(dismissAlert());
        }, 2000);
      })
      .catch((error) => {
        // dispatch(addNewRecipeFailed());
      });
  }, 1000);
};

export const deletingRecipeLoading = (recipe) => {
  return {
    type: ActionTypes.DELETING_RECIPE_LOADING,
    payload: recipe,
  };
};

export const deleteRecipeFromFE = (recipe) => {
  return {
    type: ActionTypes.DELETE_RECIPE,
    payload: recipe,
  };
};

export const dismissAlert = (recipe) => {
  return {
    type: ActionTypes.DISMISS_ALERT,
    payload: recipe,
  };
};

export const editRecipe =
  (newRecipeDetails, toggleModal, resetForm, recipeID) => (dispatch) => {
    dispatch(addNewRecipeLoading());

    setTimeout(() => {
      return fetch(baseUrl + `recipes/${recipeID}`, {
        method: "PUT",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipeDetails),
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
          dispatch(editRecipeInFE(response));
          toggleModal();
          resetForm();
          setTimeout(() => {
            dispatch(dismissAlert());
            if (newRecipeDetails.imageFile.includes("base64"))
              window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          dispatch(addNewRecipeFailed());
        });
    }, 1000);
  };

export const addNewRecipeToFE = (recipe) => {
  return {
    type: ActionTypes.ADD_NEW_RECIPE,
    payload: recipe,
  };
};

export const editRecipeInFE = (recipe) => {
  return {
    type: ActionTypes.EDIT_RECIPE,
    payload: recipe,
  };
};

export const addNewRecipeFailed = () => {
  return {
    type: ActionTypes.ADD_NEW_RECIPE_FAILED,
  };
};

export const addNewRecipeLoading = () => {
  return {
    type: ActionTypes.ADD_NEW_RECIPE_LOADING,
  };
};

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const signupUser = (creds, toggleModal, setError) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API

  return fetch(baseUrl + "users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
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
      dispatch(
        loginUser({ username: creds.username, password: creds.password })
      );
      toggleModal(false);
    })
    .catch((error) => setError("username already exists!"));
};

export const loginUser = (creds, toggleModal, setError) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  console.log(creds, "CREDSSSS");
  dispatch(requestLogin(creds));

  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
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
      if (response.success) {
        console.log("SUCESSSSS");
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        // Dispatch the success action
        // dispatch(fetchFavorites());
        dispatch(receiveLogin(response));
        window.location.href = "/groceries";
      } else {
        const error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
      toggleModal(false);
    })
    .catch((error) => {
      dispatch(loginError(error.message));
      setError("invalid credentials!");
    });
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  // dispatch(favoritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout());
};
