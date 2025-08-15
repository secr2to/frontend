import { Pressable, View } from "react-native";
import { reply } from "../type/type";
import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Suspense, useState } from "react";
import ReplyListFallback from "./replyListFallback";
import NestedReplyList from "./nestedReplyList";
import ReplyContainer from "./replyContainer";

interface ReplyProps {
  reply: reply;
}

export default function Reply({ reply }: ReplyProps) {
  const [openReplies, setOpenReplies] = useState<boolean>(false);

  return (
    <>
      {/* comment wrapper */}
      <View className="gap-4">
        {/* main commnet */}
        <ReplyContainer reply={reply} />
        {!openReplies && reply.nestedReplyCount > 0 && (
          <Pressable onPress={() => setOpenReplies(true)}>
            <View className="flex w-full items-center justify-center px-4 py-2">
              <Typography
                label={`댓글 ${reply.nestedReplyCount}개 더 보기`}
                style={TYPOGRAPHY_TYPE.SUB_BOLD}
              />
            </View>
          </Pressable>
        )}

        {/* sub comment[] */}
        {openReplies && (
          <>
            <Suspense fallback={<ReplyListFallback />}>
              <NestedReplyList parentReplyId={reply.replyId} />
            </Suspense>
            <Pressable onPress={() => setOpenReplies(false)}>
              <View className="flex w-full items-center justify-center px-4 py-2">
                <Typography
                  label="댓글 감추기"
                  style={TYPOGRAPHY_TYPE.SUB_BOLD}
                />
              </View>
            </Pressable>
          </>
        )}
      </View>
    </>
  );
}
