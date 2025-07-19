import { useMutation } from "@tanstack/react-query";
import { deleteFeedResponse } from "../type/type";
import { deleteFeed } from "../api/deleteFeed";

export const useDeleteFeed = () => {
  return useMutation<deleteFeedResponse, Error, number>({
    mutationFn: (feedId) => deleteFeed(feedId),
    onSuccess: ({ data }) => {
      console.log(data.success);
    },
  });
};
