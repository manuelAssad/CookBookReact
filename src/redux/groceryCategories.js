import * as ActionTypes from "./ActionTypes";

export const GroceryCategories = (
  state = {
    isLoading: true,
    errMess: null,
    groceryCategories: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_GROCERY_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        groceryCategories: action.payload,
      };
    case ActionTypes.GROCERY_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        groceryCategories: [],
      };
    case ActionTypes.GROCERY_CATEGORIES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
