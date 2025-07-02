import { View } from "react-native";

export default function ParticipantCardFallback() {
  return (
    <View
      className={
        "flex-1 border p-4 rounded-[5px] items-center justify-center gap-2 border-inactive-background mx-2"
      }
    >
      <View className="flex items-center justify-center size-[90px] rounded-full overflow-hidden border border-grayLigh bg-inactive-background animate-pulse" />
      <View className="flex items-center gap-1">
        <View className="w-20 h-4 bg-inactive-background animate-pulse" />
        <View className="w-24 h-4 bg-inactive-background animate-pulse" />
      </View>
    </View>
  );
}
