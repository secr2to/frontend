import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { cancelLikeFeedResponse, feed, getFeedsResponse } from "../type/type";
import { cancelLikeFeed } from "../api/cancelLikeFeed";

export const useCancelLikeFeed = () => {
  const queryClient = useQueryClient();
  return useMutation<
    cancelLikeFeedResponse,
    Error,
    { roomId: string; feedId: number },
    { previousFeeds: InfiniteData<getFeedsResponse> | undefined }
  >({
    mutationFn: ({ feedId }) => cancelLikeFeed(feedId),
    onMutate: async ({ roomId, feedId }) => {
      await queryClient.cancelQueries({ queryKey: ["getFeeds", roomId] });

      const previousFeeds = queryClient.getQueryData<
        InfiniteData<getFeedsResponse>
      >(["getFeeds", roomId]);

      if (previousFeeds) {
        queryClient.setQueryData<InfiniteData<getFeedsResponse>>(
          ["getFeeds", roomId],
          (oldData) => {
            if (!oldData) return oldData;

            const newData = {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                data: {
                  ...page.data,
                  content: page.data.content.map((feedItem: feed) =>
                    // 좋아요 상태를 `false`로 바꾸고, 좋아요 수도 1 감소시킵니다.
                    feedItem.feedId === feedId
                      ? {
                          ...feedItem,
                          heart: false,
                          heartCount: feedItem.heartCount - 1,
                        }
                      : feedItem
                  ),
                },
              })),
            };
            return newData;
          }
        );
      }

      return { previousFeeds };
    },
    onError: (err, { roomId }, context) => {
      console.error("Error cancelling like:", err);
      if (context?.previousFeeds) {
        queryClient.setQueryData(["getFeeds", roomId], context.previousFeeds);
      }
    },
  });
};
