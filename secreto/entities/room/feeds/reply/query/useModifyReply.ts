import { useMutation } from "@tanstack/react-query";
import { modifyReplyResponse } from "../type/type";
import { modifyReply } from "../api/modifyReply";

export const useModifyReply = () => {
  return useMutation<
    modifyReplyResponse,
    Error,
    {
      replyId: number;
      comment: string;
    }
  >({
    mutationFn: ({ replyId, comment }) => modifyReply(replyId, comment),
    onSuccess: (data) => {
      console.log(data.data.success);
    },
  });
};
