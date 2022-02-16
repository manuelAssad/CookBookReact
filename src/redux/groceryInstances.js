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

      action.payload.forEach((cat) => {
        refObjCopy[`c${cat._id}`] = React.createRef();
      });
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
          (g) => action.payload._id === g.grocery._id
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

      console.log(action.payload, "BROOO");
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
          : [],
      };

    case ActionTypes.ADD_NEW_GROCERY_FAILED:
      const indexOfNewItemF = state.groceryInstances.findIndex(
        (item) => item.timestamp === action.payload.timestamp
      );

      const groceryInstancesCopyF = [...state.groceryInstances];

      const newGrocerInstanceF = groceryInstancesCopyF[indexOfNewItemF];
      newGrocerInstanceF.new = false;

      groceryInstancesCopyF.splice(indexOfNewItemF, 1);
      groceryInstancesCopyF.splice(indexOfNewItemF, 0, newGrocerInstanceF);

      let filteredGroceryInstancesCopyF = [];

      if (state.groceryInstanceToFilter) {
        const indexOfNewItemFilteredF2 =
          state.filteredGroceryInstances.findIndex(
            (item) => item.timestamp === action.payload.timestamp
          );

        filteredGroceryInstancesCopyF = [...state.filteredGroceryInstances];

        filteredGroceryInstancesCopyF.splice(indexOfNewItemFilteredF2, 1);
        filteredGroceryInstancesCopyF.splice(
          indexOfNewItemFilteredF2,
          0,
          action.payload
        );
      }

      return {
        ...state,
        groceryInstances: groceryInstancesCopyF,
        filteredGroceryInstances: filteredGroceryInstancesCopyF,
      };

    case ActionTypes.ADD_NEW_GROCERY_AGAIN:
      const indexOfNewItemA = state.groceryInstances.findIndex(
        (item) => item.timestamp === action.payload.timestamp
      );

      console.log(
        action.payload.timestamp,
        state.groceryInstances,
        "COMPAREEEE"
      );

      const groceryInstancesCopyA = [...state.groceryInstances];

      const newGrocerInstanceA = groceryInstancesCopyA[indexOfNewItemA];
      newGrocerInstanceA.new = true;

      groceryInstancesCopyA.splice(indexOfNewItemA, 1);
      groceryInstancesCopyA.splice(indexOfNewItemA, 0, newGrocerInstanceA);

      let filteredGroceryInstancesCopyA = [];

      if (state.groceryInstanceToFilter) {
        const indexOfNewItemFilteredA2 =
          state.filteredGroceryInstances.findIndex(
            (item) => item.timestamp === action.payload.timestamp
          );

        filteredGroceryInstancesCopyA = [...state.filteredGroceryInstances];

        filteredGroceryInstancesCopyA.splice(indexOfNewItemFilteredA2, 1);
        filteredGroceryInstancesCopyA.splice(
          indexOfNewItemFilteredA2,
          0,
          action.payload
        );
      }

      console.log(
        groceryInstancesCopyA,
        filteredGroceryInstancesCopyA,
        "NEWLISTSSS",
        state.groceryInstances,
        state.filteredGroceryInstances
      );

      return {
        ...state,
        groceryInstances: groceryInstancesCopyA,
        filteredGroceryInstances: filteredGroceryInstancesCopyA,
      };

    case ActionTypes.MODIFY_NEW_GROCERY:
      const indexOfNewItem = state.groceryInstances.findIndex(
        (item) => item.timestamp == action.payload.timestamp
      );

      const groceryInstancesCopy2 = [...state.groceryInstances];

      console.log(
        indexOfNewItem,
        "indexOfNewItem",
        action.payload.timestamp,
        state.groceryInstances
      );

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

      console.log(
        state.groceryInstances,
        groceryInstancesCopy2,
        "COMAPREMODIFYYYY"
      );

      return {
        ...state,
        groceryInstances: groceryInstancesCopy2,
        filteredGroceryInstances: filteredGroceryInstancesCopy3,
      };

    case ActionTypes.SHOULD_UPDATE_GROCERY_INSTANCE_DETAIL:
      const indexOfNewItemDSU = state.groceryInstances.findIndex(
        (item) => item._id === action.payload._id
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
            (item) => item._id === action.payload._id
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
        (item) => item._id === action.payload._id
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
            (item) => item._id === action.payload._id
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
        (item) => item._id === action.payload._id
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
            (item) => item._id === action.payload._id
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
        (item) => item._id === action.payload
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
        (item) => item._id === action.payload
      );

      const indexOfNewItemFiltered = state.filteredGroceryInstances.findIndex(
        (item) => item._id === action.payload
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
    default:
      return state;
  }
};
