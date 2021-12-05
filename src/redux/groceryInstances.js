import * as ActionTypes from "./ActionTypes";

export const GroceryInstances = (
  state = {
    isLoading: true,
    errMess: null,
    groceryInstances: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_GROCERY_INSTANCES:
      console.log("GROCERY INSTANCESS", action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        groceryInstances: action.payload,
      };
    case ActionTypes.GROCERY_INSTANCES_LOADING:
      return { ...state, isLoading: true, errMess: null, groceryInstances: [] };
    case ActionTypes.GROCERY_INSTANCES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
