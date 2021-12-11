import * as ActionTypes from "./ActionTypes";

export const Recipes = (
  state = {
    isLoading: true,
    errMess: null,
    recipes: [],
    filteredRecipes: [],
    categoriesFetched: [],
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
    default:
      return state;
  }
};
