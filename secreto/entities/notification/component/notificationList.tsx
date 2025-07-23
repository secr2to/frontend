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
  const { data: notificationList } = useGetNotifications(period);

  return (
    <FlashList
      data={notificationList}
      estimatedItemSize={100}
      renderItem={({ item }) => <Notification notification={item} />}
      keyExtractor={(item) => item.notificationId.toString()}
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
