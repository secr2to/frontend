import { Profile, Typography } from "@/shared/components";
import CommentIcon from "@/shared/components/Icons/comment";
import HeartIcon from "@/shared/components/Icons/heart";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Dimensions, Image, Pressable, View } from "react-native";
import { feed } from "../type/type";
import { FlashList } from "@shopify/flash-list";
import { useLikeFeed } from "../query/useLikeFeed";
import { useCancelLikeFeed } from "../query/useCancelLikeFeed";
import { router } from "expo-router";
import { useGetRoomMembersProfile } from "@/entities/room/participants/query/useGetRoomMembersProfile";
import { dateConverter } from "@/shared/utils/dateConverter";
import MenuIcon from "@/shared/components/Icons/menuIcon";
import ToastMenu from "@/shared/components/Menus/toastMenu";
import { Dispatch, SetStateAction } from "react";
const { width: screenWidth } = Dimensions.get("window");

interface FeedProps {
  feed: feed;
  roomId: string;
  openMenu: number | undefined;
  setOpenMenu: Dispatch<SetStateAction<number | undefined>>;
  setTargetId: Dispatch<SetStateAction<number | undefined>>;
  setMode: Dispatch<SetStateAction<"modify" | "delete" | undefined>>;
}

export default function Feed({
  feed,
  roomId,
  openMenu,
  setOpenMenu,
  setTargetId,
  setMode,
}: FeedProps) {
  const { mutate: likeFeed } = useLikeFeed();
  const { mutate: unLikeFeed } = useCancelLikeFeed();
  const { data: profileImages } = useGetRoomMembersProfile(roomId);
  const flashListItemWidth = screenWidth - 28;
  return (
    <View className="flex flex-col gap-3 p-4">
      <View className="flex flex-row w-full justify-between items-center">
        <View className="flex flex-col gap-2">
          <Typography label={feed.title} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
          <Typography
            label={dateConverter(feed.createDate)}
            style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
            color={COLOR.INACTIVE}
          />
        </View>
        <View className="flex flex-row items-center gap-2">
          <Profile
            size="small"
            imageUri={
              profileImages.find(
                (profile) => profile.roomUserId === feed.author.roomUserId
              )?.profileUrl as string
            }
          />
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
            key={feed.feedId}
            data={feed.images}
            renderItem={({ item }) => (
              <View
                style={{
                  width: flashListItemWidth,
                  height: flashListItemWidth,
                }}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  resizeMode="cover"
                  className="size-full"
                />
              </View>
            )}
            horizontal={true}
            estimatedItemSize={400}
            pagingEnabled={true}
            keyExtractor={(_, idx) => idx.toString()}
          />
        </View>
        <View>
          <Typography label={feed.content} />
        </View>
      </View>
      <View className="flex flex-row w-full justify-between items-center px-2">
        <View className="flex flex-row items-center gap-3">
          <Pressable
            onPress={() => {
              feed.heart
                ? unLikeFeed({ roomId, feedId: feed.feedId })
                : likeFeed({ roomId, feedId: feed.feedId });
              console.log("Feed heart toggled:", feed.heart);
            }}
          >
            <View className="flex flex-row gap-2 items-center justify-center">
              <HeartIcon like={feed.heart} />
              <Typography
                label={feed.heartCount.toString()}
                style={TYPOGRAPHY_TYPE.BODY_BOLD}
              />
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push(
                `/(afterLogin)/room/${roomId}/(afterStart)/feed/${feed.feedId}/comment`
              )
            }
          >
            <View className="flex flex-row gap-2 items-center justify-center">
              <CommentIcon />
              <Typography
                label={feed.replyCount.toString()}
                style={TYPOGRAPHY_TYPE.BODY_BOLD}
              />
            </View>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            setOpenMenu(feed.feedId);
          }}
        >
          <MenuIcon />
        </Pressable>
        {openMenu && (
          <ToastMenu
            menu={[
              {
                label: "수정",
                onPress: () => {
                  setMode("modify");
                  setTargetId(feed.feedId);
                  setOpenMenu(undefined);
                },
              },
              {
                label: "삭제",
                onPress: () => {
                  setMode("delete");
                  setTargetId(feed.feedId);
                  setOpenMenu(undefined);
                },
              },
              {
                label: "닫기",
                onPress: () => {
                  setOpenMenu(undefined);
                },
              },
            ]}
          />
        )}
      </View>
      <View>
        <Typography label={feed.heartMessage} />
      </View>
    </View>
  );
}
