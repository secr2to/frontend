import { api } from "@/shared/kyInstance";
import { deleteReplyResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const deleteReply = async (
  replyId: number
): Promise<deleteReplyResponse> => {
  try {
    const response = await api.delete(`replies/${replyId}`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to delete Reply");
  }
};
