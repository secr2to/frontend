import { api } from "@/shared/kyInstance";
import { cancelLikeReplyResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const cancelLikeReply = async (
  replyId: number
): Promise<cancelLikeReplyResponse> => {
  try {
    const response = await api.delete(`replies/${replyId}/unheart`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to cancel Like Reply");
  }
};
