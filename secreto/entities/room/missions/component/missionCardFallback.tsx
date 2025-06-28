import { Image, View } from "react-native";

export default function MissionCardFallback() {
  return (
    <View className="relative flex w-full justify-center h-20 px-4 py-2 bg-inactive-background rounded-md">
      <View className="flex flex-row items-center gap-4">
        <Image
          source={require("@/shared/images/mission-image.png")}
          className="size-10"
        />
        <View className="flex flex-col gap-2">
          <View className="w-20 h-4 bg-grayDark animate-pulse"></View>
          <View className="w-24 h-4 bg-grayDark animate-pulse"></View>
        </View>
      </View>
    </View>
  );
}
