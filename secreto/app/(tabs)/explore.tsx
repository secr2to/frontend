import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Explore() {
  return (
    <View>
      <Text>explore Page</Text>
      <Link href="/" asChild>
        <Pressable>
          <View className="flex items-center justify-center w-[160px] h-[40px] bg-blue-500 p-2 rounded-md">
            <Text className="text-center">Go To Home</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
