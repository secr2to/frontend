import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getRepliesResponse,
  registReplyResponse,
  replyData,
} from "../type/type";
import { registReply } from "../api/registReply";

export const useRegistReply = () => {
  const queryClient = useQueryClient();
  return useMutation<
    registReplyResponse,
    Error,
    {
      roomId: string;
      feedId: number;
      isRoot?: boolean;
      rootId?: number;
      data: replyData;
    },
    {
      previousReplies: InfiniteData<getRepliesResponse> | undefined;
    }
  >({
    mutationFn: ({ data }) => registReply(data),
    onSuccess: (data, variables) => {
      const { roomId, feedId, rootId, isRoot } = variables;
      queryClient.refetchQueries({
        queryKey: ["getReplies", roomId, feedId, undefined],
      });
      {
        !isRoot &&
          queryClient.refetchQueries({
            queryKey: [
              "getReplies",
              roomId,
              feedId,
              !isRoot ? rootId : undefined,
            ],
          });
      }
    },
  });
};
