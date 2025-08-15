import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteReplyResponse, getRepliesResponse } from "../type/type";
import { deleteReply } from "../api/deleteReply";

export const useDeleteReply = () => {
  const queryClient = useQueryClient();
  return useMutation<
    deleteReplyResponse,
    Error,
    {
      roomId: string;
      feedId: number;
      replyId: number;
      isRoot?: boolean;
      rootId?: number;
    },
    {
      previousReplies: InfiniteData<getRepliesResponse> | undefined;
    }
  >({
    mutationFn: ({ replyId }) => deleteReply(replyId),
    onMutate: async ({ feedId, roomId, replyId, isRoot, rootId }) => {
      await queryClient.cancelQueries({
        queryKey: ["getReplies", roomId, feedId, !isRoot ? rootId : undefined],
      });

      const previousReplies = queryClient.getQueryData<
        InfiniteData<getRepliesResponse>
      >(["getReplies", roomId, feedId, !isRoot ? rootId : undefined]);

      if (previousReplies) {
        queryClient.setQueryData<InfiniteData<getRepliesResponse>>(
          ["getReplies", roomId, feedId, !isRoot ? rootId : undefined],
          (oldData) => {
            if (!oldData) return oldData;

            const newData = {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                data: {
                  ...page.data,
                  content: page.data.content.filter(
                    (replyItem) => replyItem.replyId !== replyId
                  ),
                },
              })),
            };
            return newData;
          }
        );
      }
      return { previousReplies };
    },
    onError: (err, { roomId, feedId, rootId, isRoot }, context) => {
      console.error("Error deleting reply:", err);
      if (context?.previousReplies) {
        queryClient.setQueryData(
          ["getReplies", roomId, feedId, !isRoot ? rootId : undefined],
          context.previousReplies
        );
      }
    },
    onSuccess: ({ data }) => {
      console.log(data.success);
    },
  });
};
