import { View } from "react-native";
import { reply } from "../type/type";
import ReplyContainer from "./replyContainer";

interface NestedReplyProps {
  reply: reply;
  parentReplyId: number;
}

export default function NestedReply({
  reply,
  parentReplyId,
}: NestedReplyProps) {
  return (
    <>
      {/* comment wrapper */}
      <View className="gap-4">
        {/* main commnet */}
        <ReplyContainer reply={reply} parentReplyId={parentReplyId} />
      </View>
    </>
  );
}
