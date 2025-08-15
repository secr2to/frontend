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
    {
      roomId: string;
      feedId: number;
      replyId: number;
      isRoot?: boolean;
      rootId?: number;
    },
    { previousReplies: InfiniteData<getRepliesResponse> | undefined }
  >({
    mutationFn: ({ replyId }) => likeReply(replyId),
    onMutate: async ({ roomId, feedId, replyId, rootId, isRoot }) => {
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
      console.log("like success?", data.success);
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
