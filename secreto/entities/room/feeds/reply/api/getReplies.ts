import { api } from "@/shared/kyInstance";
import { getRepliesResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getReplies = async (
  roomId: string,
  feedId: number,
  offset: number,
  replyId?: number
): Promise<getRepliesResponse> => {
  console.log(
    `rooms/${roomId}/feeds/${feedId}/replies?offset=${offset}${
      replyId ? `&replyId=${replyId}` : ""
    }`
  );
  try {
    const response = await api.get(
      `rooms/${roomId}/feeds/${feedId}/replies?offset=${offset}${
        replyId ? `&replyId=${replyId}` : ""
      }`
    );

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Replies");
  }
};
