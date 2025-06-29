import { api } from "@/shared/kyInstance";
import { deleteUserResponse } from "../type/type";

export const deleteUser = async (
  userId: number
): Promise<deleteUserResponse> => {
  try {
    const response = await api.delete(`users/${userId}`);

    return response.json();
  } catch (error) {
    console.error("Error while delete user:", error);
    throw error;
  }
};
