import { api } from "@/shared/kyInstance";
import { registFeedResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const registFeed = async (
  roomId: string,
  formData: FormData
): Promise<registFeedResponse> => {
  try {
    const response = await api.post(`rooms/${roomId}/feeds`, {
      body: formData,
    });

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to regist Feed");
  }
};
