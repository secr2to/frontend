import { useGetReplies } from "../query/useGetReplies";
import { FlashList } from "@shopify/flash-list";
import { Spacing } from "@/shared/components";
import NestedReply from "./nestedReply";
import { useContext } from "react";
import { ReplyContext } from "./replyContext";

interface NestedReplyListProps {
  parentReplyId: number;
}

export default function NestedReplyList({
  parentReplyId,
}: NestedReplyListProps) {
  const { roomId, feedId } = useContext(ReplyContext)!;
  const {
    data: reply,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetReplies(roomId, feedId, parentReplyId);

  return (
    <FlashList
      data={reply.replies}
      extraData={reply.replies}
      renderItem={({ item }) => (
        <NestedReply reply={item} parentReplyId={parentReplyId} />
      )}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ paddingLeft: 20 }}
      keyExtractor={(item) => item.replyId.toString()}
      estimatedItemSize={100}
      ItemSeparatorComponent={() => <Spacing size={8} />}
    />
  );
}
