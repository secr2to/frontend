import { useGetReplies } from "../query/useGetReplies";
import { FlashList } from "@shopify/flash-list";
import Reply from "./reply";
import { Spacing } from "@/shared/components";
import { View } from "react-native";

interface ReplyListProps {
  roomId: string;
  feedId: number;
  replyId?: number;
}

export default function ReplyList({ roomId, feedId, replyId }: ReplyListProps) {
  const { data: reply } = useGetReplies(roomId, feedId, replyId && replyId);

  return (
    <FlashList
      data={reply}
      renderItem={({ item }) => (
        <View className="flex flex-row ml-10 items-center gap-3">
          <Reply reply={item} feedId={feedId} roomId={roomId} />
        </View>
      )}
      keyExtractor={(item) => item.replyId.toString()}
      estimatedItemSize={100}
      ItemSeparatorComponent={() => <Spacing size={8} />}
    />
  );
}
