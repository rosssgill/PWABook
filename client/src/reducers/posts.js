// Reducers normally take arguments of (state, action), in our case the state is always posts since we're inside posts reducer.
// They always need to return something so we set a default parameter as an empty array
export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload]; // Spreading all old posts into a new array and adding the new post from payload
    default:
      return posts;
  }
};
