import { useGetReplies } from "../query/useGetReplies";
import { FlashList } from "@shopify/flash-list";
import Reply from "./reply";
import { Spacing, Typography } from "@/shared/components";
import { useContext } from "react";
import { ReplyContext } from "./replyContext";

export default function ReplyList() {
  const { roomId, feedId } = useContext(ReplyContext)!;
  const {
    data: reply,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetReplies(roomId, feedId);
  return (
    <FlashList
      data={reply.replies}
      extraData={reply.replies}
      renderItem={({ item }) => <Reply reply={item} />}
      keyExtractor={(item) => item.replyId.toString()}
      estimatedItemSize={100}
      ItemSeparatorComponent={() => <Spacing size={8} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        <Typography label="아직 작성된 댓글이 없습니다, 첫 댓글을 작성해 주세요!" />
      }
    />
  );
}
