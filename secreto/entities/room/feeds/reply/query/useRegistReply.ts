import { useMutation } from "@tanstack/react-query";
import { registReplyResponse, replyData } from "../type/type";
import { registReply } from "../api/registReply";

export const useRegistReply = () => {
  return useMutation<registReplyResponse, Error, replyData>({
    mutationFn: (data: replyData) => registReply(data),
    onSuccess: (data) => {
      console.log(data.data.feedId);
    },
  });
};
