import { api } from "@/shared/kyInstance";
import { chattingMessagesResponse } from "../type/type";

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
    console.error("Error while fetching chattingMessages:", error);
    throw error;
  }
};
