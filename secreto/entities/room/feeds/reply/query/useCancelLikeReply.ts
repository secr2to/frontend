import { useMutation } from "@tanstack/react-query";
import { cancelLikeReplyResponse } from "../type/type";
import { cancelLikeReply } from "../api/cancelLikeReply";

export const useCancelLikeReply = () => {
  return useMutation<cancelLikeReplyResponse, Error, number>({
    mutationFn: (replyId) => cancelLikeReply(replyId),
    onSuccess: ({ data }) => {
      console.log(data.success);
    },
  });
};
