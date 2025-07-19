import { useMutation } from "@tanstack/react-query";
import { deleteReplyResponse } from "../type/type";
import { deleteReply } from "../api/deleteReply";

export const useDeleteReply = () => {
  return useMutation<deleteReplyResponse, Error, number>({
    mutationFn: (replyId) => deleteReply(replyId),
    onSuccess: ({ data }) => {
      console.log(data.success);
    },
  });
};
