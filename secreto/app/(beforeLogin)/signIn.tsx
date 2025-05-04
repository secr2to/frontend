import { AuthButton } from "@/shared/components";
import { AUTH_PROVIDER } from "@/shared/components/AuthButton/constant";
import { router } from "expo-router";
import { View } from "react-native";
import { Image } from "expo-image";
import BigSecreto from "@/shared/images/big-secreto.svg";

export default function SignIn() {
  return (
    <View className="flex-1 flex-col gap-6 items-center justify-center">
      <View className="flex w-full items-center justify-center">
        <BigSecreto width={"100%"} height={60} />
      </View>
      <View className="w-full h-[140px]">
        <Image
          source={require("@/shared/images/twin.png")}
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
        />
      </View>
      <View className="flex w-full flex-col gap-4">
        <AuthButton
          provider={AUTH_PROVIDER.KAKAO}
          onPress={() => {
            router.replace("/(beforeLogin)/signup-complete");
          }}
        />
        <AuthButton
          provider={AUTH_PROVIDER.NAVER}
          onPress={() => {
            router.replace("/(beforeLogin)/signup-complete");
          }}
        />
        <AuthButton
          provider={AUTH_PROVIDER.GOOGLE}
          onPress={() => {
            router.replace("/(beforeLogin)/signup-complete");
          }}
        />
      </View>
    </View>
  );
}
