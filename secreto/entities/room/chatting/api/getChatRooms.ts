import { api } from "@/shared/kyInstance";
import { chatRoomsResponse } from "../type/type";

export const getChatRooms = async (
  roomId: string
): Promise<chatRoomsResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/chattings/participation`);
    return response.json();
  } catch (error) {
    console.error("Error while fetching chat rooms:", error);
    throw error;
  }
};
