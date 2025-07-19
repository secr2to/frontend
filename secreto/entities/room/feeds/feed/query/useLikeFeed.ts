import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feed, likeFeedResponse } from "../type/type";
import { likeFeed } from "../api/likefeed";

export const useLikeFeed = () => {
  const queryClient = useQueryClient();
  return useMutation<
    likeFeedResponse,
    Error,
    { feedId: number; roomId: string },
    { previousFeeds: feed[] | undefined }
  >({
    mutationFn: ({ feedId }) => likeFeed(feedId),
    onMutate: async ({ roomId, feedId }) => {
      await queryClient.cancelQueries({ queryKey: ["getFeeds", roomId] });

      const previousFeeds =
        queryClient.getQueryData<feed[]>(["getFeeds", roomId]) || [];

      queryClient.setQueryData(
        ["getFeeds", roomId],
        (oldFeeds: feed[] | undefined) => {
          return oldFeeds?.map((feed) =>
            feed.feedId === feedId ? { ...feed, heart: true } : feed
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
