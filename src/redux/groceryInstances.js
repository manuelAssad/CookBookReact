import { act } from "react-dom/test-utils";
import * as ActionTypes from "./ActionTypes";

import React from "react";

export const GroceryInstances = (
  state = {
    isLoading: true,
    errMess: null,
    groceryInstances: [],
    refObj: {},
    shouldRefetch: false,
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
      refObjCopy.c5 = React.createRef();
      refObjCopy.c6 = React.createRef();
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
          (scrollData.offsetHeight - window.innerHeight * 0.4)
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

      return {
        ...state,
        groceryInstances: groceryInstancesCopy2,
      };

    case ActionTypes.CROSS_OUT_GROCERY_INSTANCE:
      const groceryInstancesCopy3 = [...state.groceryInstances];

      const indexOfNewItem3 = state.groceryInstances.findIndex(
        (item) => item.id === action.payload
      );

      const groceryInstanceToBeCrossed = groceryInstancesCopy3[indexOfNewItem3];
      groceryInstanceToBeCrossed.crossed = !groceryInstanceToBeCrossed.crossed;

      groceryInstancesCopy3.splice(indexOfNewItem3, 1);
      groceryInstancesCopy3.splice(
        indexOfNewItem3,
        0,
        groceryInstanceToBeCrossed
      );
      return {
        ...state,
        groceryInstances: groceryInstancesCopy3,
      };

    case ActionTypes.DELETE_GROCERY_INSTANCE:
      const groceryInstancesCopy4 = [...state.groceryInstances];
      const indexOfNewItem4 = state.groceryInstances.findIndex(
        (item) => item.id === action.payload
      );

      groceryInstancesCopy4.splice(indexOfNewItem4, 1);
      console.log(
        "DELETEEEEEE",
        indexOfNewItem4,
        groceryInstancesCopy4[indexOfNewItem4]
      );

      return {
        ...state,
        groceryInstances: groceryInstancesCopy4,
      };
    case ActionTypes.GROCERY_INSTANCES_REFETCH:
      return {
        ...state,
        shouldRefetch: true,
      };
  }
};
