import { api } from "@/shared/kyInstance";
import { cancelLikeFeedResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const cancelLikeFeed = async (
  feedId: number
): Promise<cancelLikeFeedResponse> => {
  try {
    const response = await api.delete(`feeds/${feedId}/heart`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to cancel like Feed");
  }
};
