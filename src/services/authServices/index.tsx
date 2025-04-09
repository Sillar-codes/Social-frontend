import { API_ENDPOINTS } from "@/configs";
import apiRequest from "@/lib/axios";
import { AuthFormData } from "@/types/auth";

export const registerUser = async (data: AuthFormData) => {
  return apiRequest({
    method: "POST",
    url: API_ENDPOINTS.AUTH.REGISTER,
    data,
    errorMessage: "Registration failed",
  });
};

export const loginUser = async (data: AuthFormData) => {
  return apiRequest({
    method: "POST",
    url: API_ENDPOINTS.AUTH.LOGIN,
    data,
    errorMessage: "Login failed",
  });
};

export const updateUser = async (data: AuthFormData) => {
  return apiRequest({
    method: "PUT",
    url: API_ENDPOINTS.AUTH.UPDATE,
    data,
    errorMessage: "Update failed",
  });
};

export const currentUser = async () => {
  return apiRequest({
    method: "GET",
    url: API_ENDPOINTS.AUTH.USER,
    errorMessage: "Authentication Failed",
  });
};
