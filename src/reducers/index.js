import { combineReducers } from 'redux';

import { userLoginReducer, userRegisterReducer } from './userReducers';

export const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});
