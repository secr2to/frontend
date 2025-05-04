import { Button } from "@/shared/components";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-default-background p-5 gap-10">
      <Link push href="/room/123" asChild>
        <Button label="123번방으로 이동" size="menu" />
      </Link>
      <Link push href="/room-regist" asChild>
        <Button label="방 등록" size="menu" />
      </Link>
    </View>
  );
}
