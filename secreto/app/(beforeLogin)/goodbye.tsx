import { Button, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { router } from "expo-router";
import { Image, View } from "react-native";

export default function Goodbye() {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center gap-4">
        <Typography
          label="그동안 시크리또를 사랑해주셔서 감사합니다"
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
        <Image
          source={require("@/shared/images/splash-icon.png")}
          className="size-48"
          resizeMode="contain"
        />
        <Typography
          label="다시 만날 수 있기를 기대하겠습니다!"
          style={TYPOGRAPHY_TYPE.SUB_BOLD}
        />
        <View className="flex w-full">
          <Button
            label="메인으로"
            onPress={() => router.replace("/(beforeLogin)/signIn")}
            size="medium"
          />
        </View>
      </View>
    </View>
  );
}
