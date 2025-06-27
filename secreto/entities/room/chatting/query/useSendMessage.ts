import { useMutation } from "@tanstack/react-query";
import { sendMessageResponse } from "../type/type";
import { postMessage } from "../api/sendMessage";

export const useSendMessage = () => {
  return useMutation<
    sendMessageResponse,
    Error,
    {
      roomId: number;
      writerId: number;
      content: string;
    }
  >({
    mutationFn: ({ roomId, writerId, content }) =>
      postMessage(roomId, writerId, content),
  });
};
