import { Profile, Typography } from "@/shared/components";
import { Pressable, View } from "react-native";
import { reply } from "../type/type";
import { useGetRoomMembersProfile } from "@/entities/room/participants/query/useGetRoomMembersProfile";
import { useLocalSearchParams } from "expo-router";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { dateConverter } from "@/shared/utils/dateConverter";
import HeartIcon from "@/shared/components/Icons/heart";
import { useLikeReply } from "../query/useLikeReply";
import { useCancelLikeReply } from "../query/useCancelLikeReply";
import { useContext, useEffect } from "react";
import { ReplyContext } from "./replyContext";
import useUserStore from "@/shared/stores/useUserStore";
import ToastMenu from "@/shared/components/Menus/toastMenu";

interface ReplyContainerProps {
  reply: reply;
  parentReplyId?: number;
}

export default function ReplyContainer({
  reply,
  parentReplyId,
}: ReplyContainerProps) {
  const { mutate: likeReply } = useLikeReply();
  const { mutate: unLikeReply } = useCancelLikeReply();
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: profiles } = useGetRoomMembersProfile(roomId);
  const user = useUserStore((state) => state.user);

  const {
    setMode,
    setTargetId,
    setComment,
    activateMenuId,
    setActivateMenuId,
    feedId,
    setParentReplyId,
    setMentionUserId,
    setMentionUserName,
    setIsRoot,
    clearState,
  } = useContext(ReplyContext)!;

  return (
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
      <Pressable
        onLongPress={() => {
          setActivateMenuId(reply.replyId);
        }}
      >
        <View className="flex flex-col gap-1 pr-[30%]">
          <Typography label={reply.comment} style={TYPOGRAPHY_TYPE.SUB_BOLD} />
          <Typography
            label={dateConverter(reply.createDate)}
            style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
            color={COLOR.INACTIVE}
          />
          {activateMenuId === reply.replyId &&
            reply.replier.userId === user?.userId && (
              <ToastMenu
                menu={[
                  {
                    label: "수정",
                    onPress: () => {
                      setMode("modify");
                      setTargetId(activateMenuId);
                      setComment(reply.comment);
                      setParentReplyId(parentReplyId);
                      !!parentReplyId ? setIsRoot(false) : setIsRoot(true);
                    },
                  },
                  {
                    label: "삭제",
                    onPress: () => {
                      setMode("delete");
                      setTargetId(reply.replyId);
                      setParentReplyId(parentReplyId);
                      !!parentReplyId ? setIsRoot(false) : setIsRoot(true);
                    },
                  },
                ]}
              />
            )}
          {!parentReplyId && (
            <Pressable
              onPress={() => {
                setMentionUserId(reply.replier.roomUserId);
                setMentionUserName(reply.replier.roomNickname);
                setParentReplyId(reply.replyId);
                setIsRoot(false);
              }}
            >
              <Typography label="답글" />
            </Pressable>
          )}
        </View>
      </Pressable>
      <Pressable
        className="absolute right-0 top-1/2 -translate-y-1/2"
        onPress={() => {
          reply.heart
            ? unLikeReply({
                replyId: reply.replyId,
                roomId: roomId,
                feedId: feedId,
                isRoot: !parentReplyId,
                rootId: parentReplyId,
              })
            : likeReply({
                replyId: reply.replyId,
                roomId: roomId,
                feedId: feedId,
                isRoot: !parentReplyId,
                rootId: parentReplyId,
              });
          clearState();
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
  );
}
