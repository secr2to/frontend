import { api } from "@/shared/kyInstance";
import { getMyInfoResponse } from "../type/type";

export const getMyInfo = async (roomId: number): Promise<getMyInfoResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/my-info`);

    return response.json();
  } catch (error) {
    console.error("Error while getMyInfo", error);
    throw error;
  }
};
