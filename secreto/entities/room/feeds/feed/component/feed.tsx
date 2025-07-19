import { Profile, Typography } from "@/shared/components";
import CommentIcon from "@/shared/components/Icons/comment";
import HeartIcon from "@/shared/components/Icons/heart";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Image, Pressable, View } from "react-native";
import { feed } from "../type/type";
import { FlashList } from "@shopify/flash-list";
import { useLikeFeed } from "../query/useLikeFeed";
import { useCancelLikeFeed } from "../query/useCancelLikeFeed";
import { router } from "expo-router";

interface FeedProps {
  feed: feed;
  roomId: string;
}

export default function Feed({ feed, roomId }: FeedProps) {
  const { mutate: likeFeed } = useLikeFeed();
  const { mutate: unLikeFeed } = useCancelLikeFeed();
  return (
    <View className="flex flex-col gap-3 p-4">
      <View className="flex flex-row w-full justify-between items-center">
        <View className="flex flex-col">
          <Typography label={feed.title} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
          <Typography
            label={feed.createDate.toISOString().split("T")[0]}
            style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
            color={COLOR.INACTIVE}
          />
        </View>
        <View className="flex flex-row items-center gap-2">
          <Profile size="small" imageUri={feed.author.profileUrl} />
          <View className="flex flex-col">
            <Typography label={feed.author.roomNickname} />
            <Typography label={feed.author.searchId} color={COLOR.INACTIVE} />
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-2">
        {/* content section */}
        <View className="flex w-full aspect-square bg-inactive-background rounded-md">
          <FlashList
            data={feed.images}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.imageUrl }}
                resizeMode="cover"
                className="size-full"
              />
            )}
            horizontal
          />
        </View>
        <View>
          <Typography label={feed.content} />
        </View>
      </View>
      <Pressable>
        <View className="flex flex-row items-center gap-3">
          <Pressable
            onPress={() => {
              feed.heart
                ? unLikeFeed({ roomId, feedId: feed.feedId })
                : likeFeed({ roomId, feedId: feed.feedId });
            }}
          >
            <HeartIcon like={feed.heart} />
          </Pressable>
          <Pressable
            onPress={() =>
              router.push(
                `/(afterLogin)/room/${roomId}/(afterStart)/feed/${feed.feedId}/comment`
              )
            }
          >
            <CommentIcon />
          </Pressable>
        </View>
      </Pressable>
      <View>
        <Typography label={feed.heartMessage} />
      </View>
      <View>
        <View className="flex flex-row items-center gap-4">
          <Typography label="테스터" style={TYPOGRAPHY_TYPE.BODY_BOLD} />
          <Typography
            label="댓글댓글댓글댓글"
            style={TYPOGRAPHY_TYPE.BODY_REGULAR}
          />
        </View>
      </View>
    </View>
  );
}
