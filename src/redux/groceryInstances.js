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
    groceryInstanceToFilter: null,
    filteredGroceryInstances: [],
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
      };

    case ActionTypes.VIEW_ALL_GROCERY_INSTANCES:
      console.log(
        state.groceryInstances,
        action.payload,
        "groceryInstanceFilteredgroceryInstanceFiltered"
      );

      let groceryInstanceFiltered = [];
      if (action.payload)
        groceryInstanceFiltered = state.groceryInstances.filter(
          (g) => action.payload.id === g.grocery.id
        );

      return {
        ...state,
        groceryInstanceToFilter: action.payload,
        filteredGroceryInstances: groceryInstanceFiltered,
      };

    case ActionTypes.GROCERY_INSTANCES_LOADING:
      return { ...state, isLoading: true, errMess: null };
    case ActionTypes.GROCERY_INSTANCES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
    case ActionTypes.ADD_NEW_GROCERY:
      const groceryInstancesCopy = [...state.groceryInstances];

      groceryInstancesCopy.push({
        ...action.payload,
        new: true,
      });

      const filteredGroceryInstancesCopy2 = [...state.filteredGroceryInstances];
      filteredGroceryInstancesCopy2.push({
        ...action.payload,
        new: true,
      });

      setTimeout(() => {
        const scrollData =
          state.refObj[`c${action.payload.grocery.category}`].current;
        window.scrollTo(
          0,
          scrollData.offsetTop +
            (scrollData.offsetHeight - window.innerHeight * 0.4)
        );
      }, 100);

      return {
        ...state,
        groceryInstances: groceryInstancesCopy,
        groceryInstanceToFilter: state.groceryInstanceToFilter
          ? action.payload.grocery.name === state.groceryInstanceToFilter.name
            ? state.groceryInstanceToFilter
            : null
          : null,
        filteredGroceryInstances: state.groceryInstanceToFilter
          ? action.payload.grocery.name === state.groceryInstanceToFilter.name
            ? filteredGroceryInstancesCopy2
            : []
          : null,
      };

    case ActionTypes.MODIFY_NEW_GROCERY:
      const indexOfNewItem = state.groceryInstances.findIndex(
        (item) => item.timestamp === action.payload.timestamp
      );

      const groceryInstancesCopy2 = [...state.groceryInstances];

      groceryInstancesCopy2.splice(indexOfNewItem, 1);
      groceryInstancesCopy2.splice(indexOfNewItem, 0, action.payload);

      let filteredGroceryInstancesCopy3 = [];

      if (state.groceryInstanceToFilter) {
        const indexOfNewItemFiltered2 =
          state.filteredGroceryInstances.findIndex(
            (item) => item.timestamp === action.payload.timestamp
          );

        filteredGroceryInstancesCopy3 = [...state.filteredGroceryInstances];

        filteredGroceryInstancesCopy3.splice(indexOfNewItemFiltered2, 1);
        filteredGroceryInstancesCopy3.splice(
          indexOfNewItemFiltered2,
          0,
          action.payload
        );
      }

      return {
        ...state,
        groceryInstances: groceryInstancesCopy2,
        filteredGroceryInstances: filteredGroceryInstancesCopy3,
      };

    case ActionTypes.SHOULD_UPDATE_GROCERY_INSTANCE_DETAIL:
      const indexOfNewItemDSU = state.groceryInstances.findIndex(
        (item) => item.id === action.payload.id
      );

      const newGroceryInstanceItemDSU =
        state.groceryInstances[indexOfNewItemDSU];

      newGroceryInstanceItemDSU.updatingDetailStatus = "pending";
      const groceryInstancesCopyDSU = [...state.groceryInstances];

      groceryInstancesCopyDSU.splice(indexOfNewItemDSU, 1);
      groceryInstancesCopyDSU.splice(
        indexOfNewItemDSU,
        0,
        newGroceryInstanceItemDSU
      );

      const filteredGroceryInstancesCopyDSU = [
        ...state.filteredGroceryInstances,
      ];

      if (state.groceryInstanceToFilter) {
        const filteredIndexOfNewItemDSU =
          state.filteredGroceryInstances.findIndex(
            (item) => item.id === action.payload.id
          );

        const filteredNewGroceryInstanceItemDSU =
          state.filteredGroceryInstances[filteredIndexOfNewItemDSU];

        filteredNewGroceryInstanceItemDSU.updatingDetailStatus = "pending";

        filteredGroceryInstancesCopyDSU.splice(filteredIndexOfNewItemDSU, 1);
        filteredGroceryInstancesCopyDSU.splice(
          filteredIndexOfNewItemDSU,
          0,
          filteredNewGroceryInstanceItemDSU
        );
      }
      return {
        ...state,
        groceryInstances: groceryInstancesCopyDSU,
        filteredGroceryInstances: filteredGroceryInstancesCopyDSU,
      };

    case ActionTypes.SUCCESS_UPDATE_GROCERY_INSTANCE_DETAIL:
      const indexOfNewItemDSSU = state.groceryInstances.findIndex(
        (item) => item.id === action.payload.id
      );

      const groceryInstancesCopyDSSU = [...state.groceryInstances];

      const newGroceryInstanceItemDSSU =
        state.groceryInstances[indexOfNewItemDSSU];

      newGroceryInstanceItemDSSU.updatingDetailStatus = null;
      newGroceryInstanceItemDSSU.detail = action.payload.detail;

      console.log("SHOULDUPDATENOWWWW");

      groceryInstancesCopyDSSU.splice(indexOfNewItemDSSU, 1);
      groceryInstancesCopyDSSU.splice(
        indexOfNewItemDSSU,
        0,
        newGroceryInstanceItemDSSU
      );

      const filteredGroceryInstancesCopyDSSU = [
        ...state.filteredGroceryInstances,
      ];

      if (state.groceryInstanceToFilter) {
        const filteredIndexOfNewItemDSSU =
          state.filteredGroceryInstances.findIndex(
            (item) => item.id === action.payload.id
          );

        const filteredNewGroceryInstanceItemDSSU =
          state.filteredGroceryInstances[filteredIndexOfNewItemDSSU];

        filteredNewGroceryInstanceItemDSSU.updatingDetailStatus = null;
        filteredNewGroceryInstanceItemDSSU.detail = action.payload.detail;

        filteredGroceryInstancesCopyDSSU.splice(filteredIndexOfNewItemDSSU, 1);
        filteredGroceryInstancesCopyDSSU.splice(
          filteredIndexOfNewItemDSSU,
          0,
          filteredNewGroceryInstanceItemDSSU
        );
      }

      return {
        ...state,
        groceryInstances: groceryInstancesCopyDSSU,
        filteredGroceryInstances: filteredGroceryInstancesCopyDSSU,
      };

    case ActionTypes.GROCERY_INSTANCE_DETAIL_FAILED:
      const indexOfNewItemDFU = state.groceryInstances.findIndex(
        (item) => item.id === action.payload.id
      );

      const newGroceryInstanceItemDFU =
        state.groceryInstances[indexOfNewItemDFU];

      newGroceryInstanceItemDFU.updatingDetailStatus = "failed";

      const groceryInstancesCopyDFU = [...state.groceryInstances];

      groceryInstancesCopyDFU.splice(indexOfNewItemDFU, 1);
      groceryInstancesCopyDFU.splice(
        indexOfNewItemDFU,
        0,
        newGroceryInstanceItemDFU
      );

      const filteredGroceryInstancesCopyDFU = [
        ...state.filteredGroceryInstances,
      ];

      if (state.groceryInstanceToFilter) {
        const filteredIndexOfNewItemDFU =
          state.filteredGroceryInstances.findIndex(
            (item) => item.id === action.payload.id
          );

        const filteredNewGroceryInstanceItemDFU =
          state.filteredGroceryInstances[filteredIndexOfNewItemDFU];

        filteredNewGroceryInstanceItemDFU.updatingDetailStatus = "failed";

        filteredGroceryInstancesCopyDFU.splice(filteredIndexOfNewItemDFU, 1);
        filteredGroceryInstancesCopyDFU.splice(
          filteredIndexOfNewItemDFU,
          0,
          filteredNewGroceryInstanceItemDFU
        );
      }
      return {
        ...state,
        groceryInstances: groceryInstancesCopyDFU,
        filteredGroceryInstances: filteredGroceryInstancesCopyDFU,
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
      const filteredGroceryInstancesCopy = [...state.filteredGroceryInstances];

      const indexOfNewItem4 = state.groceryInstances.findIndex(
        (item) => item.id === action.payload
      );

      const indexOfNewItemFiltered = state.filteredGroceryInstances.findIndex(
        (item) => item.id === action.payload
      );

      groceryInstancesCopy4.splice(indexOfNewItem4, 1);
      filteredGroceryInstancesCopy.splice(indexOfNewItemFiltered, 1);

      let lastItemRemoved = false;
      if (!filteredGroceryInstancesCopy.length) lastItemRemoved = true;

      return {
        ...state,
        groceryInstances: groceryInstancesCopy4,
        filteredGroceryInstances: filteredGroceryInstancesCopy,
        groceryInstanceToFilter: lastItemRemoved
          ? null
          : state.groceryInstanceToFilter,
      };
    case ActionTypes.GROCERY_INSTANCES_REFETCH:
      return {
        ...state,
        shouldRefetch: true,
      };
  }
};
