import { View } from "react-native";
import NotificationFallback from "./notificationFallback";

export default function NotificationListFallback() {
  return (
    <View className="flex flex-col gap-4 p-2">
      {Array.from({ length: 4 }).map((data, index) => (
        <NotificationFallback key={index} />
      ))}
    </View>
  );
}
