import { api } from "@/shared/kyInstance";
import { chattingMemebersResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getChattingMemebers = async (
  roomId: string
): Promise<chattingMemebersResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/chattings`);
    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Chatting Members");
  }
};
