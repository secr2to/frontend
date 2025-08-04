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
import NestedReplyList from "./nestedReplyList";
import { useGetRoomMembersProfile } from "@/entities/room/participants/query/useGetRoomMembersProfile";
import { dateConverter } from "@/shared/utils/dateConverter";
import { useLikeReply } from "../query/useLikeReply";
import { useCancelLikeReply } from "../query/useCancelLikeReply";

interface ReplyProps {
  reply: reply;
  roomId: string;
  feedId: number;
  onPress?: () => void;
}

export default function Reply({ reply, roomId, feedId, onPress }: ReplyProps) {
  const [openReplies, setOpenReplies] = useState<boolean>(false);
  const { data: profiles } = useGetRoomMembersProfile(roomId);
  const { mutate: likeReply } = useLikeReply();
  const { mutate: unLikeReply } = useCancelLikeReply();

  return (
    <>
      {/* comment wrapper */}
      <View className="gap-4">
        {/* main commnet */}
        <View className="flex flex-row items-center gap-3">
          <View>
            <Profile
              size="small"
              imageUri={
                profiles.find(
                  (profile) => profile.roomUserId === reply.replier.roomUserId
                )?.profileUrl || require("@/shared/images/defaultProfile.png")
              }
            />
            <Typography
              label={reply.replier.roomNickname}
              style={TYPOGRAPHY_TYPE.CAPTION_BOLD}
            />
            <Typography
              label={reply.replier.searchId}
              style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
              color={COLOR.INACTIVE}
            />
          </View>
          <View className="flex flex-col gap-1 pr-[30%]">
            <Typography
              label={reply.comment}
              style={TYPOGRAPHY_TYPE.SUB_BOLD}
            />
            <Typography
              label={dateConverter(reply.createDate)}
              style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
              color={COLOR.INACTIVE}
            />
          </View>
          <Pressable
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onPress={() => {
              reply.heart
                ? unLikeReply({
                    replyId: reply.replyId,
                    roomId: roomId,
                    feedId: feedId,
                  })
                : likeReply({
                    replyId: reply.replyId,
                    roomId: roomId,
                    feedId: feedId,
                  });
            }}
          >
            <View className="flex flex-col items-center justify-center">
              <HeartIcon like={reply.heart} />
              <Typography
                label={reply.heartCount.toString()}
                style={TYPOGRAPHY_TYPE.BODY_BOLD}
              />
            </View>
          </Pressable>
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
              <NestedReplyList
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
