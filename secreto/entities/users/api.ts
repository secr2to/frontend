import { api } from "@/shared/kyInstance";
import {
  getTokenResponse,
  getUserLogoutResponse,
  getUserResponse,
} from "./type";
import { HttpError } from "@/shared/error";

export const getUserToken = async (
  tempId: string
): Promise<getTokenResponse> => {
  try {
    const response = await api.get(`auth/token?tempId=${tempId}`);
    return response.json();
  } catch (error) {
    throw new HttpError("Failed to fetch user token");
  }
};

export const getUserInfo = async (): Promise<getUserResponse> => {
  try {
    const response = await api.get(`users/basic`);
    return response.json();
  } catch (error) {
    throw new HttpError("Failed to fetch user info");
  }
};

export const logout = async (): Promise<getUserLogoutResponse> => {
  try {
    const response = await api.post(`logout`);

    return response.json();
  } catch (error) {
    throw new HttpError("Failed to log out user");
  }
};
