import { useMutation } from "@tanstack/react-query";
import { updateFeedResponse } from "../type/type";
import { updateFeed } from "../api/updateFeed";

export const useUpdateFeed = () => {
  return useMutation<
    updateFeedResponse,
    Error,
    { roomId: string; feedData: FormData }
  >({
    mutationFn: ({ roomId, feedData }) => updateFeed(roomId, feedData),
    onSuccess: ({ data }) => {
      console.log(data.success);
    },
  });
};
