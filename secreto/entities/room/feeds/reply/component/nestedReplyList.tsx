import { useGetReplies } from "../query/useGetReplies";
import { FlashList } from "@shopify/flash-list";
import { Spacing } from "@/shared/components";
import NestedReply from "./nestedReply";

interface NestedReplyListProps {
  roomId: string;
  feedId: number;
  replyId: number;
}

export default function NestedReplyList({
  roomId,
  feedId,
  replyId,
}: NestedReplyListProps) {
  const { data: reply } = useGetReplies(roomId, feedId, replyId);

  return (
    <FlashList
      data={reply}
      renderItem={({ item }) => <NestedReply reply={item} />}
      contentContainerStyle={{ paddingLeft: 20 }}
      keyExtractor={(item) => item.replyId.toString()}
      estimatedItemSize={100}
      ItemSeparatorComponent={() => <Spacing size={8} />}
    />
  );
}
