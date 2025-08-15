import { ReplyContext } from "@/entities/room/feeds/reply/component/replyContext";
import ReplyCount from "@/entities/room/feeds/reply/component/replyCount";
import ReplyList from "@/entities/room/feeds/reply/component/replyList";
import ReplyListFallback from "@/entities/room/feeds/reply/component/replyListFallback";
import { useDeleteReply } from "@/entities/room/feeds/reply/query/useDeleteReply";
import { useModifyReply } from "@/entities/room/feeds/reply/query/useModifyReply";
import { useRegistReply } from "@/entities/room/feeds/reply/query/useRegistReply";
import { CardPopup, Inputbox, Typography } from "@/shared/components";
import InputTooltip from "@/shared/components/Input/inputTooltip";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { clsx } from "@/shared/utils";
import { Suspense, useContext, useState } from "react";
import { Image, Pressable, View } from "react-native";

export default function FeedReplies() {
  const replyContext = useContext(ReplyContext);
  const {
    roomId,
    feedId,
    comment,
    setComment,
    parentReplyId,
    mentionUserId,
    mentionUserName,
    mode,
    setMode,
    targetId,
    activateMenuId,
    setActivateMenuId,
    clearState,
    isRoot,
  } = replyContext!;

  const { mutate: modifyReply } = useModifyReply();
  const { mutate: deleteReply } = useDeleteReply();
  const { mutate: registReply } = useRegistReply();

  return (
    <>
      <Pressable
        onPress={
          activateMenuId ? () => setActivateMenuId(undefined) : undefined
        }
        className="flex-1"
      >
        <View className="flex-1 bg-default-background">
          <View className="flex-1 p-4 gap-4">
            <Suspense
              fallback={
                <View className="h-6 w-10 bg-inactive-background animate-pulse"></View>
              }
            >
              <ReplyCount feedId={Number(feedId)} roomId={roomId as string} />
            </Suspense>
            <View className="flex-1 w-full gap-4">
              <Suspense fallback={<ReplyListFallback />}>
                <ReplyList />
              </Suspense>
            </View>
            <View className="flex flex-row items-center gap-4 h-16">
              <View className="flex-1">
                {(mentionUserName || mode === "modify") && (
                  <InputTooltip
                    tooltip={
                      mentionUserName
                        ? `${mentionUserName}님에게 답글 다는중`
                        : "작성된 댓글 수정 중"
                    }
                    onPress={clearState}
                  />
                )}
                <Inputbox
                  placeholder="댓글을 입력하세요"
                  activeBorder={false}
                  value={comment}
                  setValue={setComment}
                />
              </View>
              <Pressable
                className={clsx(
                  "flex size-12 rounded-md bg-active-background p-2",
                  !comment.trim() && "opacity-50"
                )}
                disabled={!comment.trim()}
                onPress={() => {
                  mode === "modify"
                    ? modifyReply({
                        roomId,
                        feedId,
                        rootId: parentReplyId,
                        isRoot,
                        replyId: targetId as number,
                        comment,
                      })
                    : registReply({
                        roomId,
                        feedId,
                        isRoot,
                        rootId: parentReplyId,
                        data: {
                          roomId: roomId,
                          feedId: feedId,
                          comment: comment,
                          parentReplyId: parentReplyId
                            ? parentReplyId
                            : undefined,
                          mentionUserId: mentionUserId
                            ? mentionUserId
                            : undefined,
                        },
                      });
                  clearState();
                }}
              >
                <Image
                  source={require("@/shared/images/send.png")}
                  className="size-full"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
      {mode === "delete" && (
        <CardPopup
          onClose={() => setMode(undefined)}
          confirmLabel="삭제"
          cancelLabel="취소"
          onSuccess={() => {
            deleteReply({
              roomId: roomId as string,
              feedId: Number(feedId),
              replyId: targetId as number,
              rootId: parentReplyId,
            });
            clearState();
          }}
          onCancel={() => setMode(undefined)}
        >
          <Typography
            label="작성한 댓글을 삭제 하시겠습니까?"
            style={TYPOGRAPHY_TYPE.SUB_BOLD}
          />
        </CardPopup>
      )}
    </>
  );
}
