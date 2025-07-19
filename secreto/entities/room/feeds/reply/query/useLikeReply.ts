import { useMutation } from "@tanstack/react-query";
import { likeReplyResponse, modifyReplyResponse } from "../type/type";
import { modifyReply } from "../api/modifyReply";
import { likeReply } from "../api/likeReply";

export const useLikeReply = () => {
  return useMutation<likeReplyResponse, Error, number>({
    mutationFn: (replyId) => likeReply(replyId),
    onSuccess: ({ data }) => {
      console.log(data.success);
    },
  });
};
