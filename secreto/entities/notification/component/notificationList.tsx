import { View } from "react-native";
import { useGetNotifications } from "../query/useGetNotifications";
import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { FlashList } from "@shopify/flash-list";
import Notification from "./notification";

interface NotificationListProps {
  period: "TODAY" | "WEEK" | "ALL";
}

export default function NotificationList({ period }: NotificationListProps) {
  const {
    data: notificationList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetNotifications(period, 5);
  console.log("period", period);

  return (
    <FlashList
      key={period}
      data={notificationList}
      estimatedItemSize={100}
      renderItem={({ item }) => <Notification notification={item} />}
      keyExtractor={(item, idx) => idx.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          console.log("Reached!");
          fetchNextPage();
        }
      }}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-2">
          <Typography
            label="받은 알림이 없습니다."
            color={COLOR.INACTIVE}
            style={TYPOGRAPHY_TYPE.BODY_BOLD}
          />
        </View>
      }
    />
  );
}
