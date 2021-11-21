import { combineReducers } from 'redux';

import { userLoginReducer, userRegisterReducer } from './userReducers';
import { createDishReducers } from './storeReducers';

export const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createDish: createDishReducers
});
