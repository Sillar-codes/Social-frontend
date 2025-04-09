import { CommentFormData, PostFormData } from "@/types/post";
import apiRequest from "@/lib/axios";
import { API_ENDPOINTS } from "@/configs";

export const fetchPosts = async () => {
  return apiRequest({
    url: API_ENDPOINTS.POSTS.ALL,
    method: "GET",
    errorMessage: "Fetching failed",
  });
};

export const createPost = async (data: PostFormData) => {
  return apiRequest({
    url: API_ENDPOINTS.POSTS.CREATE,
    method: "POST",
    data,
    errorMessage: "Creating Post failed",
  });
};

export const likePost = async (postId: string) => {
  return apiRequest({
    url: API_ENDPOINTS.POSTS.LIKE.replace(":id", postId),
    method: "POST",
    data: {},
    errorMessage: "Liking failed",
  });
};

export const unlikePost = async (postId: string) => {
  return apiRequest({
    url: API_ENDPOINTS.POSTS.UNLIKE.replace(":id", postId),
    method: "POST",
    data: {},
    errorMessage: "Liking failed",
  });
};

export const commentOnPost = async (postId: string, data: CommentFormData) => {
  return apiRequest({
    url: API_ENDPOINTS.POSTS.COMMENT.replace(":id", postId),
    method: "POST",
    data,
    errorMessage: "Comment failed",
  });
};
