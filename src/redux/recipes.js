import * as ActionTypes from "./ActionTypes";

export const Recipes = (
  state = {
    isLoading: true,
    isLoadingCategories: true,
    errMess: null,
    recipes: [],
    filteredRecipes: [],
    categoriesFetched: [],
    categories: [],
    activeRecipeCategory: null,
    history: {},
    recipeDetailsLoading: true,
    recipeIngredients: [],
    recipeSteps: [],
    shouldRefetch: false,
    addingNewRecipeFailed: false,
    addingNewRecipeLoading: false,
    addedNewRecipe: false,
    editedRecipe: false,
    deletedRecipe: false,
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

    case ActionTypes.ADD_RECIPE_CATEGORIES:
      return {
        ...state,
        isLoadingCategories: false,
        errMess: null,
        categories: action.payload,
      };
    case ActionTypes.RECIPE_CATEGORIES_LOADING:
      return { ...state, isLoadingCategories: true, errMess: null };
    case ActionTypes.RECIPE_CATEGORIES_FAILED:
      return { ...state, isLoadingCategories: false, errMess: action.payload };

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
          (recipe) => recipe.recipe_category._id == action.payload
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

    case ActionTypes.ADD_RECIPE_DETAILS:
      return {
        ...state,
        recipeIngredients: action.payload.ingredients,
        recipeSteps: action.payload.prep_steps,
        recipeDetailsLoading: false,
      };
    case ActionTypes.RECIPE_DETAILS_LOADING:
      return {
        ...state,
        recipeDetailsLoading: true,
      };
    case ActionTypes.UNSET_REFETCH:
      return {
        ...state,
        shouldRefetch: false,
      };

    case ActionTypes.SHOULD_ADD_INGREDIENT_TO_LIST:
      const indexOfIngredient = state.recipeIngredients.findIndex(
        (item) => item._id === action.payload
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
        (item) => item._id === action.payload
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
        (item) => item._id === action.payload
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

    case ActionTypes.ADD_NEW_RECIPE:
      const activeCategory = state.activeRecipeCategory;
      const filteredRecipesCopy = [...state.filteredRecipes];
      console.log(action.payload, activeCategory, "MUSTBESAMEEE");
      if (
        activeCategory === action.payload.recipe_category._id ||
        !activeCategory
      ) {
        filteredRecipesCopy.push({ ...action.payload, new: true });
      }

      return {
        ...state,
        recipes: state.recipes.concat({ ...action.payload, new: true }),
        filteredRecipes: filteredRecipesCopy,
        addingNewRecipeFailed: false,
        addingNewRecipeLoading: false,
        addedNewRecipe: true,
      };

    case ActionTypes.EDIT_RECIPE:
      const filteredRecipesCopy2 = [...state.filteredRecipes];
      const recipesCopy2 = [...state.recipes];

      const filteredIndex = filteredRecipesCopy2.findIndex(
        (recipe) => recipe._id == action.payload.recipe._id
      );
      const index = recipesCopy2.findIndex(
        (recipe) => recipe._id == action.payload.recipe._id
      );

      if (filteredIndex !== -1) {
        console.log("FFFFTTTTPPPP", filteredRecipesCopy2, action.payload);
        filteredRecipesCopy2.splice(filteredIndex, 1);
        filteredRecipesCopy2.splice(filteredIndex, 0, action.payload.recipe);
      }

      if (index !== -1) {
        console.log("FFFFTTTTPPPP22", recipesCopy2, action.payload);
        recipesCopy2.splice(index, 1);
        recipesCopy2.splice(index, 0, action.payload.recipe);
      }

      return {
        ...state,
        recipes: recipesCopy2,
        filteredRecipes: filteredRecipesCopy2,
        addingNewRecipeFailed: false,
        addingNewRecipeLoading: false,
        editedRecipe: true,
      };

    case ActionTypes.DELETING_RECIPE_LOADING:
      const filteredRecipesCopy4 = [...state.filteredRecipes];
      const recipesCopy4 = [...state.recipes];

      const filteredIndex1 = filteredRecipesCopy4.findIndex(
        (recipe) => recipe._id == action.payload
      );
      const index2 = recipesCopy4.findIndex(
        (recipe) => recipe._id == action.payload
      );

      if (filteredIndex1 !== -1) {
        const newFileteredRecipeItem = {
          ...filteredRecipesCopy4[filteredIndex1],
        };
        filteredRecipesCopy4.splice(filteredIndex1, 1);
        newFileteredRecipeItem.deleting = true;
        console.log(
          newFileteredRecipeItem,
          "newFileteredRecipeItemnewFileteredRecipeItem"
        );
        filteredRecipesCopy4.splice(filteredIndex1, 0, newFileteredRecipeItem);
      }

      if (index2 !== -1) {
        const newRecipeItem = {
          ...recipesCopy4[index2],
        };
        recipesCopy4.splice(index2, 1);
        newRecipeItem.deleting = true;
        console.log(newRecipeItem, "newRecipeItemnewRecipeItem");
        recipesCopy4.splice(index2, 0, newRecipeItem);
      }

      return {
        ...state,
        recipes: recipesCopy4,
        filteredRecipes: filteredRecipesCopy4,
      };

    case ActionTypes.DELETE_RECIPE:
      const filteredRecipesCopy3 = [...state.filteredRecipes];
      const recipesCopy3 = [...state.recipes];

      const newFilteredRecipes = filteredRecipesCopy3.filter(
        (recipe) => recipe._id !== action.payload._id
      );
      const newRecipes = recipesCopy3.filter(
        (recipe) => recipe._id !== action.payload._id
      );

      return {
        ...state,
        recipes: newRecipes,
        filteredRecipes: newFilteredRecipes,
        deletedRecipe: true,
      };

    case ActionTypes.DISMISS_ALERT:
      return {
        ...state,
        addedNewRecipe: false,
        editedRecipe: false,
        deletedRecipe: false,
      };

    case ActionTypes.ADD_NEW_RECIPE_FAILED:
      return {
        ...state,
        addingNewRecipeLoading: false,
        addingNewRecipeFailed: true,
      };
    case ActionTypes.ADD_NEW_RECIPE_LOADING:
      return {
        ...state,
        addingNewRecipeLoading: true,
        addingNewRecipeFailed: false,
      };
    default:
      return state;
  }
};
