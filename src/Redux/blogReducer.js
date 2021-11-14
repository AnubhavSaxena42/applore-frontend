const initState = {
  user: {},
  pendingPosts: [],
  approvedPosts: [],
  userPosts: [],
  users: [],
};

const blogReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload.user };
    case "SET_PENDING":
      return { ...state, pendingPosts: action.payload.pendingPosts };
    case "SET_APPROVED":
      return { ...state, approvedPosts: action.payload.approvedPosts };
    case "SET_USER_POSTS":
      return { ...state, userPosts: action.payload.userPosts };
    case "SET_USERS":
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};

export default blogReducer;
