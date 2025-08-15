import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { feedInfo, getRepliesResponse, reply } from "../type/type";
import { getReplies } from "../api/getReplies";

export const useGetReplies = (
  roomId: string,
  feedId: number,
  replyId?: number
) => {
  return useSuspenseInfiniteQuery<
    getRepliesResponse,
    Error,
    { replies: reply[]; feedInfo: feedInfo },
    [_1: string, _2: string, _3: number, _4?: number],
    number
  >({
    queryKey: ["getReplies", roomId, feedId, replyId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getReplies(roomId, feedId, pageParam, replyId),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.offset : undefined,
    select: (data) => {
      return {
        replies: data.pages.flatMap((page) => page.data.content),
        feedInfo: data.pages[0].data.feedInfo,
      };
    },
  });
};
