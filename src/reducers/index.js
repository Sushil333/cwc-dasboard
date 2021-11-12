import { combineReducers } from 'redux';

import userLoginReducer from './userReducers';

export const reducers = combineReducers({
  userLogin: userLoginReducer
});
