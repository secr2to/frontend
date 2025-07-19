import { useSuspenseQuery } from "@tanstack/react-query";
import { getRepliesResponse, reply } from "../type/type";
import { getReplies } from "../api/getReplies";

export const useGetReplies = (
  roomId: string,
  feedId: number,
  replyId?: number
) => {
  return useSuspenseQuery<
    getRepliesResponse,
    Error,
    reply[],
    [_1: string, _2: number, _3: string, _4?: number]
  >({
    queryKey: ["getReplies", feedId, roomId, replyId],
    queryFn: () => getReplies(feedId, roomId, replyId),
    select: (data) => {
      return data.data;
    },
  });
};
