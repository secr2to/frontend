import ReplyCount from "@/entities/room/feeds/reply/component/replyCount";
import ReplyList from "@/entities/room/feeds/reply/component/replyList";
import ReplyListFallback from "@/entities/room/feeds/reply/component/replyListFallback";
import { useRegistReply } from "@/entities/room/feeds/reply/query/useRegistReply";
import { Inputbox } from "@/shared/components";
import { clsx } from "@/shared/utils";
import { useLocalSearchParams } from "expo-router";
import { Suspense, useState } from "react";
import { Image, Pressable, View } from "react-native";

export default function FeedReplies() {
  const { roomId, feedId } = useLocalSearchParams();
  const [comment, setComment] = useState("");
  const [parentReplyId, setParentReplyId] = useState<number | undefined>(
    undefined
  );
  const [mentionUserId, setMentionUserId] = useState<number | undefined>(
    undefined
  );
  const { mutate: registReply } = useRegistReply();

  return (
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
            <ReplyList
              roomId={roomId as string}
              feedId={Number(feedId)}
              setParentReplyId={setParentReplyId}
              setMentionUserId={setMentionUserId}
            />
          </Suspense>
        </View>
        <View className="flex flex-row items-center gap-4 h-14">
          <View className="flex-1">
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
              registReply({
                roomId: roomId as string,
                feedId: Number(feedId),
                comment: comment,
                parentReplyId: parentReplyId ? parentReplyId : undefined,
                mentionUserId: mentionUserId ? mentionUserId : undefined,
              });
              setComment("");
              setParentReplyId(undefined);
              setMentionUserId(undefined);
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
  );
}
