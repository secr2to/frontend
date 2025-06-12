import { View } from "react-native";

export default function RoomCardFallback() {
  return (
    <View className="flex flex-row w-full">
      <View className="w-[80px] h-[80px] rounded-[5px] bg-base-background border border-inactive-background animate-pulse" />
      <View className="flex-1 flex-col p-2 gap-1">
        <View className="w-40 h-5 bg-inactive-background animate-pulse" />
        <View className="w-20 h-3 bg-inactive-background animate-pulse" />
        <View className="w-32 h-3 bg-inactive-background animate-pulse" />
        <View className="w-24 h-3 bg-inactive-background animate-pulse" />
      </View>
    </View>
  );
}
