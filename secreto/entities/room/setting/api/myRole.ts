import { api } from "@/shared/kyInstance";
import { getMyRoleResponse } from "../type/type";

export const getMyRole = async (roomId: string): Promise<getMyRoleResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/my-role`);

    return response.json();
  } catch (error) {
    console.error("Error while fetching my role:", error);
    throw error;
  }
};
