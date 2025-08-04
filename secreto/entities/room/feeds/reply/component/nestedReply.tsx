import { Pressable, View } from "react-native";
import { reply } from "../type/type";
import { Profile, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import HeartIcon from "@/shared/components/Icons/heart";
import { useLocalSearchParams } from "expo-router";
import { useGetRoomMembersProfile } from "@/entities/room/participants/query/useGetRoomMembersProfile";
import { dateConverter } from "@/shared/utils/dateConverter";
import { useLikeReply } from "../query/useLikeReply";
import { useCancelLikeReply } from "../query/useCancelLikeReply";

interface NestedReplyProps {
  reply: reply;
  feedId: number;
}

export default function NestedReply({ reply, feedId }: NestedReplyProps) {
  const { roomId } = useLocalSearchParams() as { roomId: string };
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
          <View className="flex flex-col gap-1 pr-28">
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
                    roomId,
                    feedId,
                    replyId: reply.replyId,
                    isNested: true,
                  })
                : likeReply({
                    roomId,
                    feedId,
                    replyId: reply.replyId,
                    isNested: true,
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
      </View>
    </>
  );
}
