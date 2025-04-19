import { Link } from "expo-router";
import { Button, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Home Page</Text>
      <Link href="/explore" asChild>
        <Pressable>
          <View>
            <Text className="text-center">Go To explore</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
