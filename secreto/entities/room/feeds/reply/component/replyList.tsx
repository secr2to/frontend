import { useGetReplies } from "../query/useGetReplies";
import { FlashList } from "@shopify/flash-list";
import Reply from "./reply";
import { Spacing, Typography } from "@/shared/components";
import { Dispatch, SetStateAction } from "react";

interface ReplyListProps {
  roomId: string;
  feedId: number;
  setMentionUserId: Dispatch<SetStateAction<number | undefined>>;
  setParentReplyId: Dispatch<SetStateAction<number | undefined>>;
}

export default function ReplyList({
  roomId,
  feedId,
  setMentionUserId,
  setParentReplyId,
}: ReplyListProps) {
  const { data: reply } = useGetReplies(roomId, feedId);

  return (
    <FlashList
      data={reply}
      renderItem={({ item }) => (
        <Reply
          reply={item}
          feedId={feedId}
          roomId={roomId}
          onPress={() => {
            setMentionUserId(item.replier.roomUserId);
            setParentReplyId(item.replyId);
          }}
        />
      )}
      keyExtractor={(item) => item.replyId.toString()}
      estimatedItemSize={100}
      ItemSeparatorComponent={() => <Spacing size={8} />}
      ListEmptyComponent={
        <Typography label="아직 작성된 댓글이 없습니다, 첫 댓글을 작성해 주세요!" />
      }
    />
  );
}
