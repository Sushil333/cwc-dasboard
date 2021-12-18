import * as actionType from '../constants/storeConstants';
import * as api from '../../api/index';

export const createDish = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.CREATE_DISH_REQUEST
    });

    const { data } = await api.createDish(formData);

    dispatch({
      type: actionType.CREATE_DISH_SUCCESS,
      payload: data
    });

    navigate('/dashboard/products', { replace: true });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: actionType.CREATE_DISH_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchStoreDishes = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_STORE_DISHES_REQ
    });

    const { data } = await api.getStoreDishes();

    dispatch({
      type: actionType.GET_STORE_DISHES_SUCCESS,
      payload: data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: actionType.GET_STORE_DISHES_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
