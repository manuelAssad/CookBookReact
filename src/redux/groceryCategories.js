import * as ActionTypes from "./ActionTypes";

export const GroceryCategories = (
  state = {
    isLoading: true,
    errMess: null,
    groceryCategories: [],
    activeCat: 0,
    newGroceryName: "",
    scrollActive: true,
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

    case ActionTypes.CATEGORY_SECTION_CHANGE:
      console.log(action.payload, "groceryCategoriesgroceryCategories");
      const categoryId = action.payload;
      if (
        document.getElementById(`mobile-tab-groceryCategories-${categoryId}`)
      ) {
        document
          .getElementById(`mobile-tab-groceryCategories-${categoryId}`)
          .scrollIntoView({
            block: "end",
            inline: "nearest",
          });
      }

      return { ...state, activeCat: categoryId };

    case ActionTypes.CLICK_CATEGORY:
      const scrollData = action.ref[`c${action.payload}`].current;
      window.scrollTo(0, scrollData.offsetTop - window.innerHeight * 0.15);

      return { ...state, activeCat: action.payload };

    case ActionTypes.PAUSE_DETECTION:
      return { ...state, scrollActive: false };
    case ActionTypes.RESUME_DETECTION:
      return { ...state, scrollActive: true };

    default:
      return state;
  }
};
