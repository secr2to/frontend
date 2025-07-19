import { api } from "@/shared/kyInstance";
import { likeFeedResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const likeFeed = async (feedId: number): Promise<likeFeedResponse> => {
  try {
    const response = await api.post(`feeds/${feedId}/heart`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to like Feed");
  }
};
