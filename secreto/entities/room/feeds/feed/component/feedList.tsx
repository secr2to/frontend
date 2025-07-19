import { FlashList } from "@shopify/flash-list";
import Feed from "./feed";
import { useGetFeeds } from "../query/useGetFeed";
import { Spacing } from "@/shared/components";
import EmptyFeed from "./feedEmpty";

interface FeedListProps {
  roomId: string;
}

export default function FeedList({ roomId }: FeedListProps) {
  const { data, fetchNextPage } = useGetFeeds(roomId);
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <Feed feed={item} roomId={roomId} />}
      keyExtractor={(item) => item.feedId.toString()}
      ItemSeparatorComponent={() => <Spacing size={8} />}
      ListEmptyComponent={<EmptyFeed />}
      estimatedItemSize={800}
      onEndReachedThreshold={0.5}
      onEndReached={fetchNextPage}
    />
  );
}
