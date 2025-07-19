import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelLikeFeedResponse, feed } from "../type/type";
import { cancelLikeFeed } from "../api/cancelLikeFeed";

export const useCancelLikeFeed = () => {
  const queryClient = useQueryClient();
  return useMutation<
    cancelLikeFeedResponse,
    Error,
    { roomId: string; feedId: number },
    { previousFeeds: feed[] | undefined }
  >({
    mutationFn: ({ feedId }) => cancelLikeFeed(feedId),
    onMutate: async ({ roomId, feedId }) => {
      await queryClient.cancelQueries({ queryKey: ["getFeeds", roomId] });

      const previousFeeds =
        queryClient.getQueryData<feed[]>(["getFeeds", roomId]) || [];

      queryClient.setQueryData(
        ["getFeeds", roomId],
        (oldFeeds: feed[] | undefined) => {
          return oldFeeds?.map((feed) =>
            feed.feedId === feedId ? { ...feed, heart: false } : feed
          );
        }
      );

      return { previousFeeds };
    },
    onError: (err, { roomId }, context) => {
      if (context?.previousFeeds) {
        queryClient.setQueryData(["getFeeds", roomId], context.previousFeeds);
      }
    },
    onSuccess: ({ data }) => {
      console.log(data.success);
    },
  });
};
