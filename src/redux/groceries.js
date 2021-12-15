import * as ActionTypes from "./ActionTypes";

export const Groceries = (
  state = {
    isLoading: true,
    errMess: null,
    groceries: [],
    filteredGroceries: [],
    searchActive: false,
    newGroceryName: "",
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_GROCERIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        groceries: action.payload,
        filteredGroceries: action.payload,
      };
    case ActionTypes.GROCERIES_LOADING:
      return { ...state, isLoading: true, errMess: null };
    case ActionTypes.GROCERIES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    case ActionTypes.FILTER_GROCERIES:
      const newFilteredGroceries = state.groceries.filter(
        (g) =>
          g.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          g.category.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, filteredGroceries: newFilteredGroceries };
    case ActionTypes.SET_SEARCH_ACTIVE:
      return { ...state, searchActive: action.payload };
    case ActionTypes.CHANGE_GROCERY_SEARCH_VALUE:
      return { ...state, newGroceryName: action.payload };

    default:
      return state;
  }
};
