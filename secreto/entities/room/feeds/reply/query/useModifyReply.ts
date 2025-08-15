import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getRepliesResponse, modifyReplyResponse } from "../type/type";
import { modifyReply } from "../api/modifyReply";

export const useModifyReply = () => {
  const queryClient = useQueryClient();
  return useMutation<
    modifyReplyResponse,
    Error,
    {
      roomId: string;
      feedId: number;
      isRoot?: boolean;
      rootId?: number;
      replyId: number;
      comment: string;
    },
    {
      previousReplies: InfiniteData<getRepliesResponse> | undefined;
    }
  >({
    mutationFn: ({ replyId, comment, isRoot }) => modifyReply(replyId, comment),
    onMutate: async ({ roomId, feedId, replyId, rootId, comment, isRoot }) => {
      await queryClient.cancelQueries({
        queryKey: ["getReplies", roomId, feedId, !isRoot ? rootId : undefined],
      });

      const previousReplies = queryClient.getQueryData<
        InfiniteData<getRepliesResponse>
      >(["getReplies", roomId, feedId, rootId ? rootId : undefined]);

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
                  content: page.data.content.map((replyItem) =>
                    replyItem.replyId === replyId
                      ? { ...replyItem, comment }
                      : replyItem
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
    onSuccess: (data) => {
      console.log(data.data.success);
    },
    onError: (err, { roomId, feedId, rootId, isRoot }, context) => {
      console.error("Error modifying reply:", err);
      if (context?.previousReplies) {
        queryClient.setQueryData(
          ["getReplies", roomId, feedId, !isRoot ? rootId : undefined],
          context.previousReplies
        );
      }
    },
  });
};
