export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "Users/Register",
    LOGIN: "Users/Login",
    UPDATE: "Users/Update",
    USER: "Users/Current",
  },
  USERS: {
    EXPLORE: "Users",
    FOLLOW: "Users/Follow/:id",
    UNFOLLOW: "Users/Unfollow/:id",
    USER_BY_ID: "Users/:userId",
  },
  POSTS: {
    CREATE: "Posts",
    ALL: "Posts",
    LIKE: "Posts/Like/:id",
    UNLIKE: "Posts/Unlike/:id",
    COMMENT: "Posts/Comment/:id",
  },
};
