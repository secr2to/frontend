import { api } from "@/shared/kyInstance";
import { updateFeedResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const updateFeed = async (
  roomId: string,
  formData: FormData
): Promise<updateFeedResponse> => {
  try {
    const response = await api.put(`/feeds/${roomId}`, {
      body: formData,
    });

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to update Feed");
  }
};
