import * as actionType from '../constants/storeConstants';

export const createDishReducers = (state = {}, action) => {
  switch (action.type) {
    case actionType.CREATE_DISH_REQUEST:
      return { loading: true };

    case actionType.CREATE_DISH_SUCCESS:
      return { loading: false, createdDish: action.payload };

    case actionType.CREATE_DISH_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const fetchStoreDishesReducers = (state = {}, action) => {
  switch (action.type) {
    case actionType.GET_STORE_DISHES_REQ:
      return { loading: true };

    case actionType.GET_STORE_DISHES_SUCCESS:
      return { loading: false, allDishes: action.payload };

    case actionType.GET_STORE_DISHES_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
