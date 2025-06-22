import { Typography } from "@/shared/components";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Feed() {
  const { roomId } = useLocalSearchParams();
  return (
    <View className="flex-1 bg-default-background">
      <Typography label={"Feed Page, This room's roomId is " + roomId} />
    </View>
  );
}
