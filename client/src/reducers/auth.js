/* eslint-disable default-param-last */
import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action.data }));
      return { ...state, authData: action.data };
    case LOGOUT:
      localStorage.clear('profile');
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
