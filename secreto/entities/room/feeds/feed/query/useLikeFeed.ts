import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { feed, getFeedsResponse, likeFeedResponse } from "../type/type";
import { likeFeed } from "../api/likefeed";

export const useLikeFeed = () => {
  const queryClient = useQueryClient();
  return useMutation<
    likeFeedResponse,
    Error,
    { feedId: number; roomId: string },
    { previousFeeds: InfiniteData<getFeedsResponse> | undefined }
  >({
    mutationFn: ({ feedId }) => likeFeed(feedId),
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
                    feedItem.feedId === feedId
                      ? {
                          ...feedItem,
                          heart: true,
                          heartCount: feedItem.heartCount + 1,
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
      console.error("Error liking feed:", err);
      if (context?.previousFeeds) {
        queryClient.setQueryData(["getFeeds", roomId], context.previousFeeds);
      }
    },
  });
};
