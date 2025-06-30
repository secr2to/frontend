import { api } from "@/shared/kyInstance";
import { chatRoomsResponse, chattingMemebersResponse } from "../type/type";

export const getChattingMemebers = async (
  roomId: string
): Promise<chattingMemebersResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/chattings`);
    return response.json();
  } catch (error) {
    console.error("Error while fetching chatting members:", error);
    throw error;
  }
};
