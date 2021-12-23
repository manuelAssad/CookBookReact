import * as ActionTypes from "./ActionTypes";

export const Recipes = (
  state = {
    isLoading: true,
    errMess: null,
    recipes: [],
    filteredRecipes: [],
    categoriesFetched: [],
    categories: [
      { id: 0, name: "Main Courses" },
      { id: 1, name: "Side Dishes" },
      { id: 2, name: "Desserts" },
    ],
    activeRecipeCategory: null,
    history: {},

    recipeIngredients: [],
    recipeIngredientsLoading: false,
    recipeIngredientsFailed: false,
    recipeSteps: [],
    recipeStepsLoading: false,
    recipeStepsFailed: false,
    shouldRefetch: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_RECIPES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        recipes:
          action.category === null
            ? action.payload
            : state.recipes.concat(action.payload),
        filteredRecipes: [...action.payload],
      };
    case ActionTypes.RECIPES_LOADING:
      return { ...state, isLoading: true, errMess: null };
    case ActionTypes.RECIPES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    case ActionTypes.SET_RECIPES_CATEGORIES_FETCHED:
      const categoriesFetchedCopy = state.categoriesFetched;
      if (action.payload === null) {
        categoriesFetchedCopy.push("all");
      } else if (
        !categoriesFetchedCopy.includes(action.payload.toString()) &&
        !categoriesFetchedCopy.includes("all")
      ) {
        categoriesFetchedCopy.push(action.payload.toString());
      }
      return { ...state, categoriesFetched: categoriesFetchedCopy };

    case ActionTypes.FILTER_RECIPES:
      const recipesCopy = state.recipes;
      let filteredRecipesDraft = [];

      if (action.payload === null) {
        filteredRecipesDraft = state.recipes;
      } else {
        filteredRecipesDraft = recipesCopy.filter(
          (recipe) => recipe.recipe_category.id == action.payload
        );
      }

      return { ...state, filteredRecipes: filteredRecipesDraft };

    case ActionTypes.SET_RECIPE_CATEGORY:
      if (
        document.getElementById(`mobile-tab-recipeCategories-${action.payload}`)
      ) {
        document
          .getElementById(`mobile-tab-recipeCategories-${action.payload}`)
          .scrollIntoView({
            block: "end",
            inline: "nearest",
          });
      }
      return { ...state, activeRecipeCategory: action.payload };

    case ActionTypes.RECIPE_INGREDIENTS_FAILED:
      return {
        ...state,
        recipeIngredients: [],
        recipeIngredientsLoading: false,
        recipeIngredientsFailed: true,
      };
    case ActionTypes.RECIPE_INGREDIENTS_LOADING:
      return {
        ...state,
        recipeIngredients: [],
        recipeIngredientsLoading: true,
        recipeIngredientsFailed: false,
      };
    case ActionTypes.ADD_RECIPE_INGREDIENTS:
      console.log("RECIPE INGREDIENTSSS", action.payload);
      return {
        ...state,
        recipeIngredients: action.payload,
        recipeIngredientsLoading: false,
        recipeIngredientsFailed: false,
      };

    case ActionTypes.RECIPE_STEPS_FAILED:
      return {
        ...state,
        recipeSteps: [],
        recipeStepsLoading: false,
        recipeStepsFailed: true,
      };
    case ActionTypes.UNSET_REFETCH:
      return {
        ...state,
        shouldRefetch: false,
      };
    case ActionTypes.RECIPE_STEPS_LOADING:
      return {
        ...state,
        recipeSteps: [],
        recipeStepsLoading: true,
        recipeStepsFailed: false,
      };
    case ActionTypes.ADD_RECIPE_STEPS:
      console.log("RECIPE STEPSSS", action.payload);
      return {
        ...state,
        recipeSteps: action.payload,
        recipeStepsLoading: false,
        recipeStepsFailed: false,
      };

    case ActionTypes.SHOULD_ADD_INGREDIENT_TO_LIST:
      const indexOfIngredient = state.recipeIngredients.findIndex(
        (item) => item.id === action.payload
      );

      const recipeIngredientsCopy = [...state.recipeIngredients];
      const newIngredient = state.recipeIngredients[indexOfIngredient];
      newIngredient.addingToListStatus = "pending";
      recipeIngredientsCopy.splice(indexOfIngredient, 1);

      recipeIngredientsCopy.splice(indexOfIngredient, 0, newIngredient);
      return {
        ...state,
        recipeIngredients: recipeIngredientsCopy,
      };

    case ActionTypes.SUCCESSFULLY_ADDED_INGREDIENT_TO_LIST:
      const indexOfIngredient2 = state.recipeIngredients.findIndex(
        (item) => item.id === action.payload
      );

      const recipeIngredientsCopy2 = [...state.recipeIngredients];
      const newIngredient2 = state.recipeIngredients[indexOfIngredient2];
      newIngredient2.addingToListStatus = "success";
      recipeIngredientsCopy2.splice(indexOfIngredient2, 1);

      recipeIngredientsCopy2.splice(indexOfIngredient2, 0, newIngredient2);
      return {
        ...state,
        recipeIngredients: recipeIngredientsCopy2,
        shouldRefetch: true,
      };

    case ActionTypes.FAILED_ADDING_INGREDIENT_TO_LIST:
      const indexOfIngredient3 = state.recipeIngredients.findIndex(
        (item) => item.id === action.payload
      );

      const recipeIngredientsCopy3 = [...state.recipeIngredients];
      const newIngredient3 = state.recipeIngredients[indexOfIngredient3];
      newIngredient3.addingToListStatus = "failed";
      recipeIngredientsCopy3.splice(indexOfIngredient3, 1);

      recipeIngredientsCopy3.splice(indexOfIngredient3, 0, newIngredient3);
      return {
        ...state,
        recipeIngredients: recipeIngredientsCopy3,
      };

    case ActionTypes.SET_HISTORY:
      return { ...state, history: action.payload };
    default:
      return state;
  }
};
