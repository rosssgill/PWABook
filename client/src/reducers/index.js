import { combineReducers } from '@reduxjs/toolkit';

import posts from './posts';
import auth from './auth';

export default combineReducers({
  posts: posts,
  auth: auth,
});
