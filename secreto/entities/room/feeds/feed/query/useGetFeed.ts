import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { feed, getFeedsResponse } from "../type/type";
import { getFeeds } from "../api/getFeeds";

export const useGetFeeds = (roomId: string) => {
  return useSuspenseInfiniteQuery<
    getFeedsResponse,
    Error,
    feed[],
    [_1: string, _2: string],
    number
  >({
    queryKey: ["getFeeds", roomId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFeeds(roomId, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.offset : undefined,
    select: (data) => {
      return data.pages.flatMap((page) => page.data.content);
    },
  });
};
