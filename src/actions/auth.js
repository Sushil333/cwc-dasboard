import { AUTH, LOGIN_ERR } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate('/', { replace: true });
  } catch (error) {
    const msg = error.response.message;
    dispatch({ type: LOGIN_ERR, msg });
    console.log(error.response);
    console.log(error.message);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate('/', { replace: true });
  } catch (error) {
    console.log(error);
  }
};
