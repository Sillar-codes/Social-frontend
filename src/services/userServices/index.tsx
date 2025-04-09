import { API_ENDPOINTS } from "@/configs";
import apiRequest from "@/lib/axios";

export const exploreUsers = async () => {
  return apiRequest({
    method: "GET",
    url: API_ENDPOINTS.USERS.EXPLORE,
    errorMessage: "Exploration failed",
  });
};

export const followUser = (userId: string) => {
  return apiRequest({
    method: "POST",
    url: API_ENDPOINTS.USERS.FOLLOW.replace(":id", userId),
    data: {},
    errorMessage: "Following failed",
  });
};

export const unFollowUser = (userId: string) => {
  return apiRequest({
    method: "POST",
    url: API_ENDPOINTS.USERS.UNFOLLOW.replace(":id", userId),
    data: {},
    errorMessage: "Unfollowing failed",
  });
};
