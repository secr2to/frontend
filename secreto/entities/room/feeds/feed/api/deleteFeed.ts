import { api } from "@/shared/kyInstance";
import { deleteFeedResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const deleteFeed = async (
  feedId: number
): Promise<deleteFeedResponse> => {
  try {
    const response = await api.delete(`feeds/${feedId}`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to delete Feed");
  }
};
