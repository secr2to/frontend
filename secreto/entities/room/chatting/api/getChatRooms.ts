import { api } from "@/shared/kyInstance";
import { chatRoomsResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getChatRooms = async (
  roomId: string
): Promise<chatRoomsResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/chattings/participation`);
    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Chat Rooms");
  }
};
