import { api } from "@/shared/kyInstance";
import { likeReplyResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const likeReply = async (
  replyId: number
): Promise<likeReplyResponse> => {
  try {
    const response = await api.post(`replies/${replyId}/heart`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to like Reply");
  }
};
