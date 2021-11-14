import * as actionType from '../constants/userConstants';

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.USER_LOGIN_REQUEST:
      return { loading: true };
    case actionType.USER_LOGIN_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { loading: false, userInfo: action.payload };
    case actionType.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case actionType.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userLoginReducer;
