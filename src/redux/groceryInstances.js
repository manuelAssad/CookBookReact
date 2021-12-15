import { act } from "react-dom/test-utils";
import * as ActionTypes from "./ActionTypes";

import React from "react";

export const GroceryInstances = (
  state = {
    isLoading: true,
    errMess: null,
    groceryInstances: [],
    refObj: {},
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_REF:
      const refObjCopy = { ...state.refObj };
      refObjCopy.c0 = React.createRef();
      refObjCopy.c1 = React.createRef();
      refObjCopy.c2 = React.createRef();
      refObjCopy.c3 = React.createRef();
      refObjCopy.c4 = React.createRef();

      return {
        ...state,
        refObj: refObjCopy,
      };
    case ActionTypes.ADD_GROCERY_INSTANCES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        groceryInstances: action.payload,
        filteredGroceryInstances: action.payload,
      };

    case ActionTypes.GROCERY_INSTANCES_LOADING:
      return { ...state, isLoading: true, errMess: null };
    case ActionTypes.GROCERY_INSTANCES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
    case ActionTypes.ADD_NEW_GROCERY:
      const groceryInstancesCopy = [...state.groceryInstances];
      const filteredGroceryInstancesCopy = [...state.filteredGroceryInstances];
      groceryInstancesCopy.push({
        ...action.payload,
        new: true,
      });
      filteredGroceryInstancesCopy.push({
        ...action.payload,
        new: true,
      });

      const scrollData =
        state.refObj[`c${action.payload.grocery.category}`].current;
      window.scrollTo(
        0,
        scrollData.offsetTop +
          (scrollData.offsetHeight - window.innerHeight * 0.65)
      );

      return {
        ...state,
        groceryInstances: groceryInstancesCopy,
        filteredGroceryInstances: filteredGroceryInstancesCopy,
      };

    case ActionTypes.MODIFY_NEW_GROCERY:
      const indexOfNewItem = state.groceryInstances.findIndex(
        (item) => item.timestamp === action.payload.timestamp
      );

      const groceryInstancesCopy2 = [...state.groceryInstances];

      groceryInstancesCopy2.splice(indexOfNewItem, 1);
      groceryInstancesCopy2.splice(indexOfNewItem, 0, action.payload);

      console.log("NEWWWGROCERYINSTANCESS", groceryInstancesCopy2);

      return {
        ...state,
        groceryInstances: groceryInstancesCopy2,
      };
  }
};
