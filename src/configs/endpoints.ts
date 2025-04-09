export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    UPDATE: "auth",
    USER: "auth",
  },
  USERS: {
    EXPLORE: "users",
    FOLLOW: "users/:id/follow",
    UNFOLLOW: "users/:id/unfollow",
    USER_BY_ID: "users/:id",
  },
  POSTS: {
    CREATE: "posts",
    ALL: "posts",
    LIKE: "posts/:id/like",
    UNLIKE: "posts/:id/unlike",
    COMMENT: "posts/:id/comment",
  },
};
