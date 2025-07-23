import { Pressable, View } from "react-native";
import { notification } from "../type/type";
import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { clsx } from "@/shared/utils";

interface NotificationProps {
  notification: notification;
  onPress?: () => void;
}

export default function Notification({
  notification,
  onPress,
}: NotificationProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        className={clsx(
          "flex flex-col gap-4 p-2",
          notification.readYn && "opacity-50"
        )}
      >
        <View className="flex flex-row">
          <Typography
            label={notification.type}
            style={TYPOGRAPHY_TYPE.BODY_BOLD}
          />
          {/* <Typography label="- 싸피13반 모여라" /> */}
        </View>
        <View>
          <Typography label={notification.content} />
        </View>
        <View>
          <Typography label="1분 전" color={COLOR.INACTIVE} />
        </View>
      </View>
    </Pressable>
  );
}
