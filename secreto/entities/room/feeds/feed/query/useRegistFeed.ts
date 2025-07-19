import { useMutation } from "@tanstack/react-query";
import { registFeedResponse } from "../type/type";
import { registFeed } from "../api/registFeed";

export const useRegistFeed = () => {
  return useMutation<
    registFeedResponse,
    Error,
    { roomId: string; feedData: FormData }
  >({
    mutationFn: ({ roomId, feedData }) => registFeed(roomId, feedData),
    onSuccess: ({ data }) => {
      console.log(data.feedId);
    },
  });
};
