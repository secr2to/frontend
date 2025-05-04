import { Button, Typography } from "@/shared/components";
import { BUTTON_SIZE } from "@/shared/components/Button/constant";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { router } from "expo-router";
import { Image, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 w-full flex-col gap-6 items-center justify-center">
      <View className="flex w-full items-center justify-center">
        <Image source={require("@/shared/images/big-secreto.svg")} />
      </View>
      <View className="w-full h-[140px]">
        <Image
          source={require("@/shared/images/twin.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
      <View className="flex w-full flex-col gap-4">
        <Typography
          label={`회원가입이${"\n"}완료되었습니다.`}
          color={COLOR.BLACK}
          className="text-[32px] text-center"
        />
        <Typography
          label={`시크리또와 친구가 되어주셔서 감사합니다!`}
          color={COLOR.GRAYDARK}
          className="text-center"
          style={TYPOGRAPHY_TYPE.SUB_REGULAR}
        />
      </View>
      <View className="flex w-full">
        <Button
          label="로그인 하러가기"
          size={BUTTON_SIZE.LARGE}
          onPress={() => {
            router.replace("/(afterLogin)/main");
          }}
        />
      </View>
    </View>
  );
}
