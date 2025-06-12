import { View } from "react-native";
import RoomCardFallback from "./roomCardFallback";

export default function RoomListFallback() {
  return (
    <View className="flex-1 p-5 gap-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <RoomCardFallback key={index} />
      ))}
    </View>
  );
}
