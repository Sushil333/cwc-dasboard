import * as actionType from '../constants/userConstants';
import * as api from '../../api/index';

export const login = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.USER_LOGIN_REQUEST
    });

    const { data } = await api.signIn(formData);

    dispatch({
      type: actionType.USER_LOGIN_SUCCESS,
      payload: data
    });

    navigate('/dashboard', { replace: true });
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

export const register = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.USER_REGISTER_REQUEST
    });

    const { data } = await api.signUp(formData);

    dispatch({
      type: actionType.USER_REGISTER_SUCCESS,
      payload: data
    });

    dispatch({
      type: actionType.USER_LOGIN_SUCCESS,
      payload: data
    });

    navigate('/dashboard', { replace: true });
  } catch (error) {
    dispatch({
      type: actionType.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
