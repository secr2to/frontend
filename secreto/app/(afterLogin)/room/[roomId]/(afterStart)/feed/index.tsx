import FeedList from "@/entities/room/feeds/feed/component/feedList";
import FeedListFallback from "@/entities/room/feeds/feed/component/feedListFallback";
import { Typography } from "@/shared/components";
import { router, useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { Pressable, View } from "react-native";

export default function Feed() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  return (
    <View className="flex-1 bg-default-background">
      <Pressable
        onPress={() =>
          router.push(
            `/(afterLogin)/room/${roomId}/(afterStart)/feed/3/comment`
          )
        }
      >
        <Typography label="이동" />
      </Pressable>
      <Suspense fallback={<FeedListFallback />}>
        <FeedList roomId={roomId} />
      </Suspense>
    </View>
  );
}
