import { api } from "@/shared/kyInstance";
import { chattingMessagesResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getChattings = async (
  roomId: string,
  type: "ALL" | "MANITO" | "MANITI"
): Promise<chattingMessagesResponse> => {
  try {
    const response = await api.get(
      `rooms/${roomId}/chattings/${type}/messages`
    );

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Chatting Messages");
  }
};
