import { api } from "@/shared/kyInstance";
import { replyData, registReplyResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const registReply = async (
  replyData: replyData
): Promise<registReplyResponse> => {
  try {
    const response = await api.post(`replies`, {
      json: replyData,
    });

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to regist Reply");
  }
};
