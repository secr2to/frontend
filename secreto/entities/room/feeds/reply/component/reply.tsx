import { Pressable, View } from "react-native";
import { reply } from "../type/type";
import { Profile, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import HeartIcon from "@/shared/components/Icons/heart";
import { Suspense, useState } from "react";
import ReplyListFallback from "./replyListFallback";
import ReplyList from "./replyList";

interface ReplyProps {
  reply: reply;
  roomId: string;
  feedId: number;
}

export default function Reply({ reply, roomId, feedId }: ReplyProps) {
  const [openReplies, setOpenReplies] = useState<boolean>(false);

  return (
    <>
      {/* comment wrapper */}
      <View className="gap-4">
        {/* main commnet */}
        <View className="flex flex-row items-center gap-3">
          <View>
            <Profile size="small" imageUri={reply.replier.profileUrl} />
          </View>
          <View className="flex flex-col gap-1">
            <Typography
              label={reply.replier.roomNickname}
              style={TYPOGRAPHY_TYPE.SUB_BOLD}
            />
            <Typography
              label={reply.replier.searchId}
              className="max-w-[80px] line-clamp-1"
              style={TYPOGRAPHY_TYPE.BODY_REGULAR}
              color={COLOR.INACTIVE}
            />
          </View>

          <View className="flex-1 gap-1">
            <Typography label={reply.content} />
            {!reply.nestedReplyYn && (
              <Pressable
                onPress={() => alert("답글 기능은 아직 구현되지 않았습니다.")}
              >
                <Typography label="답글" style={TYPOGRAPHY_TYPE.SUB_BOLD} />
              </Pressable>
            )}
          </View>
          <HeartIcon />
        </View>

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
              <ReplyList
                roomId={roomId}
                feedId={feedId}
                replyId={reply.replyId}
              />
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
