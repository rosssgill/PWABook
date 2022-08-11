/* eslint-disable default-param-last */
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
// Reducers normally take arguments of (state, action), here the state is always posts since we're inside posts reducer.
// They always need to return something so we set a default parameter as an empty array
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload]; // Spreading old posts into a new array and adding the new post from payload
    case UPDATE:
    case LIKE:
      // Return updated post from payload if it is different, else return original post
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      // Return a new array with all posts that don't have the id specified in the payload
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
