import { act } from "react-dom/test-utils";
import * as ActionTypes from "./ActionTypes";
export const InitialRecipeDetails = (
  state = {
    imageUrl: "",
    name: "",
    category: {},
    servings: 1,
    cookTime: 0,
    prepTime: 1,
    ingredients: [],
    prepSteps: [],
    ingredientToEdit: {},
    prepStepToEdit: {},
    imageFile: "",
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_RECIPE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.concat(action.payload),
      };

    case ActionTypes.EDIT_INGREDIENT:
      const ingredientsCopyE = [...state.ingredients];
      ingredientsCopyE.splice(action.payload.position, 1);
      ingredientsCopyE.splice(action.payload.position, 0, action.payload);

      return {
        ...state,
        ingredients: ingredientsCopyE,
      };

    case ActionTypes.UPGRADE_INGREDIENTS_LIST:
      const originalList = [...action.payload];
      const newList = [];
      console.log(originalList, "ORIGINALLISTTTT");
      originalList.forEach((item, i) => {
        const newItem = { ...item };
        newItem.position = i;
        newList.push(newItem);
      });
      return {
        ...state,
        ingredients: newList,
      };

    case ActionTypes.UPGRADE_PREP_STEPS_LIST:
      const originalListP = [...action.payload];
      const newListP = [];
      originalListP.forEach((item, i) => {
        const newItemP = { ...item };
        newItemP.position = i;
        newListP.push(newItemP);
      });
      return {
        ...state,
        prepSteps: newListP,
      };
    case ActionTypes.DELETE_RECIPE_INGREDIENT:
      const ingredientsCopy = [...state.ingredients];
      const positionOfDeletedItem = action.payload;
      ingredientsCopy.splice(action.payload, 1);

      ingredientsCopy.forEach((ing, i) => {
        if (ing.position > positionOfDeletedItem) {
          const ingToModify = { ...ing };
          ingToModify.position = ingToModify.position - 1;
          ingredientsCopy.splice(i, 1);
          ingredientsCopy.splice(i, 0, ingToModify);
        }
      });
      return {
        ...state,
        ingredients: ingredientsCopy,
      };

    case ActionTypes.SET_INGREDIENT_TO_EDIT:
      return {
        ...state,
        ingredientToEdit: action.payload,
      };

    case ActionTypes.ADD_PREP_STEP:
      const prepStepObj = action.payload;
      prepStepObj.position = state.prepSteps.length;
      return {
        ...state,
        prepSteps: state.prepSteps.concat(prepStepObj),
      };

    case ActionTypes.DELETE_PREP_STEP:
      const prepStepsCopy = [...state.prepSteps];
      const positionOfDeletedItemP = action.payload;
      prepStepsCopy.splice(action.payload, 1);

      prepStepsCopy.forEach((ing, i) => {
        if (ing.position > positionOfDeletedItemP) {
          const ingToModify = ing;
          ingToModify.position = ingToModify.position - 1;
          prepStepsCopy.splice(i, 1);
          prepStepsCopy.splice(i, 0, ingToModify);
        }
      });
      return {
        ...state,
        prepSteps: prepStepsCopy,
      };

    case ActionTypes.SET_PREP_STEP_TO_EDIT:
      return {
        ...state,
        prepStepToEdit: action.payload,
      };

    case ActionTypes.EDIT_PREP_STEP:
      const prepStepsCopyE = [...state.prepSteps];
      prepStepsCopyE.splice(action.payload.position, 1);
      prepStepsCopyE.splice(action.payload.position, 0, action.payload);

      return {
        ...state,
        prepSteps: prepStepsCopyE,
      };

    case ActionTypes.CHANGE_RECIPE_CATEGORY:
      console.log(action.payload, "CHANGE_RECIPE_CATEGORY");
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};
