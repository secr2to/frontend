import { api } from "@/shared/kyInstance";
import { deleteRoomResponse } from "../type/type";

export const deleteRoom = async (
  roomId: string
): Promise<deleteRoomResponse> => {
  try {
    const response = await api.put(`rooms/${roomId}`);

    return response.json();
  } catch (error) {
    console.error("Error while changeSelfIntroduction", error);
    throw error;
  }
};
