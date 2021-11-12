import * as actionType from '../constants/userConstants';
import * as api from '../api/index';

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.USER_LOGIN_REQUEST
    });

    const { data } = await api.signIn(formData);

    dispatch({
      type: actionType.USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: actionType.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: actionType.USER_LOGOUT });
  document.location.href = '/login';
};
