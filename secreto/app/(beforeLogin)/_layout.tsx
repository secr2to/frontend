import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-primary2">
      <View className="flex-1 w-full px-5">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
