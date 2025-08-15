import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { cancelLikeReplyResponse, getRepliesResponse } from "../type/type";
import { cancelLikeReply } from "../api/cancelLikeReply";

export const useCancelLikeReply = () => {
  const queryClient = useQueryClient();

  return useMutation<
    cancelLikeReplyResponse,
    Error,
    {
      roomId: string;
      feedId: number;
      replyId: number;
      rootId?: number;
      isRoot?: boolean;
    },
    { previousReplies: InfiniteData<getRepliesResponse> | undefined }
  >({
    mutationFn: ({ replyId }) => cancelLikeReply(replyId),
    onMutate: async ({ roomId, feedId, replyId, isRoot, rootId }) => {
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
                  content: page.data.content.map((replyItem) =>
                    replyItem.replyId === replyId
                      ? {
                          ...replyItem,
                          heart: false,
                          heartCount: replyItem.heartCount - 1,
                        }
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
    onSuccess: ({ data }) => {
      console.log(data.success);
    },
    onError: (err, { roomId, feedId, rootId, isRoot }, context) => {
      console.error("Error liking reply:", err);
      if (context?.previousReplies) {
        queryClient.setQueryData(
          ["getReplies", roomId, feedId, !isRoot ? rootId : undefined],
          context.previousReplies
        );
      }
    },
  });
};
