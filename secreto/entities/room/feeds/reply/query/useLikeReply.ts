import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getRepliesResponse,
  likeReplyResponse,
  modifyReplyResponse,
  reply,
} from "../type/type";
import { likeReply } from "../api/likeReply";

export const useLikeReply = () => {
  const queryClient = useQueryClient();
  return useMutation<
    likeReplyResponse,
    Error,
    { roomId: string; feedId: number; replyId: number; isNested?: boolean },
    { previousReplies: InfiniteData<getRepliesResponse> | undefined }
  >({
    mutationFn: ({ roomId, feedId, replyId, isNested }) => likeReply(replyId),
    onMutate: async ({ roomId, feedId, replyId, isNested }) => {
      await queryClient.cancelQueries({
        queryKey: ["getReplies", roomId, feedId, isNested && replyId],
      });

      const previousReplies = queryClient.getQueryData<
        InfiniteData<getRepliesResponse>
      >(["getReplies", roomId, feedId, isNested && replyId]);

      if (previousReplies) {
        queryClient.setQueryData<InfiniteData<getRepliesResponse>>(
          ["getReplies", roomId, feedId, isNested && replyId],
          (oldData) => {
            if (!oldData) return oldData;
            const newData = {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                data: {
                  ...page.data,
                  content: page.data.content.map((replyItem: reply) =>
                    replyItem.replyId === replyId
                      ? {
                          ...replyItem,
                          heart: true,
                          heartCount: replyItem.heartCount + 1,
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
    onError: (err, { roomId, feedId, replyId, isNested }, context) => {
      console.error("Error liking reply:", err);
      if (context?.previousReplies) {
        queryClient.setQueryData(
          ["getReplies", roomId, feedId, isNested && replyId],
          context.previousReplies
        );
      }
    },
  });
};
