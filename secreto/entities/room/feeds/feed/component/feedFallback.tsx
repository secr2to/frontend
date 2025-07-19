import { View } from "react-native";

export default function FeedFallback() {
  return (
    <View className="flex flex-col gap-3 p-4">
      <View className="flex flex-row w-full justify-between items-center">
        <View className="flex flex-col gap-2">
          <View className="h-6 w-48 bg-inactive-background animate-pulse"></View>
          <View className="h-6 w-36 bg-inactive-background animate-pulse"></View>
        </View>
        <View className="flex flex-row items-center gap-2">
          <View className="size-10 rounded-full bg-inactive-background animate-pulse"></View>
          <View className="flex flex-col gap-2">
            <View className="h-4 w-12 bg-inactive-background animate-pulse"></View>
            <View className="h-4 w-20 bg-inactive-background animate-pulse"></View>
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-2">
        {/* content section */}
        <View className="flex w-full aspect-square bg-inactive-background rounded-md animate-pulse"></View>
        <View className="gap-1">
          <View className="h-6 w-64 bg-inactive-background animate-pulse"></View>
          <View className="h-6 w-48 bg-inactive-background animate-pulse"></View>
          <View className="h-6 w-64 bg-inactive-background animate-pulse"></View>
          <View className="h-6 w-48 bg-inactive-background animate-pulse"></View>
        </View>
      </View>
      <View>
        <View className="h-6 w-64 bg-inactive-background animate-pulse"></View>
      </View>
    </View>
  );
}
