import { api } from "@/shared/kyInstance";
import { getRoomInfoResponse } from "../type/type";

export const getRoomInfo = async (
  roomId: string
): Promise<getRoomInfoResponse> => {
  try {
    const reponse = await api.get(`rooms/${roomId}`);

    return reponse.json();
  } catch (error) {
    console.error("Error while fetching room info:", error);
    throw error;
  }
};
