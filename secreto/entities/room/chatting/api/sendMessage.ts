import { api } from "@/shared/kyInstance";
import { chatRoomsResponse, sendMessageResponse } from "../type/type";

export const postMessage = async (
  chattingRoomId: number,
  writerId: number,
  content: string
): Promise<sendMessageResponse> => {
  try {
    const response = await api.post(`chattings/${chattingRoomId}/messages`, {
      json: {
        writerId: writerId,
        content: content,
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error while sending messages:", error);
    throw error;
  }
};
