import { api } from "@/shared/kyInstance";
import {
  getTokenResponse,
  getUserLogoutResponse,
  getUserResponse,
} from "./type";

export const getUserToken = async (
  tempId: string
): Promise<getTokenResponse> => {
  const response = await api.get(`auth/token?tempId=${tempId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user toekn");
  }

  return response.json();
};

export const getUserInfo = async (): Promise<getUserResponse> => {
  const response = await api.get(`users/basic`);

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

export const logout = async (): Promise<getUserLogoutResponse> => {
  try {
    const response = await api.post(`logout`);

    return response.json();
  } catch (error) {
    console.error("Error while logging out user:", error);
    throw error;
  }
};
