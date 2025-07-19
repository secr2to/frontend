import { api } from "@/shared/kyInstance";
import { modifyReplyResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const modifyReply = async (
  replyId: number,
  comment: string
): Promise<modifyReplyResponse> => {
  try {
    const response = await api.put(`replies/${replyId}`, {
      json: { comment },
    });

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to modify Reply");
  }
};
