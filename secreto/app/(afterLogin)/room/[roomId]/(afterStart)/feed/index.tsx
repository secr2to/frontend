import FeedList from "@/entities/room/feeds/feed/component/feedList";
import FeedListFallback from "@/entities/room/feeds/feed/component/feedListFallback";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";

export default function Feed() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  return (
    <View className="flex-1 bg-default-background">
      <Suspense fallback={<FeedListFallback />}>
        <FeedList roomId={roomId} />
      </Suspense>
    </View>
  );
}
