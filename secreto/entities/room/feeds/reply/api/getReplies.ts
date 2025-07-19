import { api } from "@/shared/kyInstance";
import { getRepliesResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getReplies = async (
  feedId: number,
  roomId: string,
  replyId?: number
): Promise<getRepliesResponse> => {
  try {
    const response = await api.get(
      `rooms/${roomId}/feeds/${feedId}/replies?${
        replyId ? `replyId=${replyId}` : ""
      }`
    );

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Replies");
  }
};
