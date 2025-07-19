import ReplyCount from "@/entities/room/feeds/reply/component/replyCount";
import ReplyList from "@/entities/room/feeds/reply/component/replyList";
import ReplyListFallback from "@/entities/room/feeds/reply/component/replyListFallback";
import { Inputbox } from "@/shared/components";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { Image, View } from "react-native";

export default function FeedReplies() {
  const { roomId, feedId } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-default-background">
      <View className="flex-1 p-4">
        <Suspense
          fallback={
            <View className="h-6 w-10 bg-inactive-background animate-pulse"></View>
          }
        >
          <ReplyCount feedId={Number(feedId)} roomId={roomId as string} />
        </Suspense>
        <View className="flex-1 w-full gap-4">
          <Suspense fallback={<ReplyListFallback />}>
            <ReplyList roomId={roomId as string} feedId={Number(feedId)} />
          </Suspense>
        </View>
        <View className="flex flex-row items-center gap-4 h-14">
          <View className="flex-1">
            <Inputbox placeholder="댓글을 입력하세요" activeBorder={false} />
          </View>
          <View className="flex size-12 rounded-md bg-active-background p-2">
            <Image
              source={require("@/shared/images/send.png")}
              className="size-full"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
