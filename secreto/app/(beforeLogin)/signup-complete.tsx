import { useGetToken, useGetUser } from "@/entities/users/query";
import { serviceToken } from "@/entities/users/type";
import { Button, Typography } from "@/shared/components";
import { BUTTON_SIZE } from "@/shared/components/Button/constant";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { saveAccessToken, saveRefreshToken } from "@/shared/stores/storage";
import useUserStore from "@/shared/stores/useUserStore";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";

export default function Home() {
  const params = useSearchParams();
  const isNewUser = params.get("isNewUser");
  const router = useRouter();

  const { data: tokenData } = useGetToken(params.get("tempId") || "");
  const { data: userInfo, refetch: getUser } = useGetUser();

  const saveUser = useUserStore((state) => state.saveUser);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (tokenData) {
      saveToken(tokenData);
    }
  }, [tokenData]);

  useEffect(() => {
    if (userInfo) {
      saveUser(userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (isNewUser === "false" && isLoggedIn && userInfo) {
      router.replace("/(afterLogin)/main");
    }
  }, [isNewUser, isLoggedIn, userInfo]);

  const saveToken = async (data: serviceToken) => {
    await saveAccessToken(data.accessToken);
    await saveRefreshToken(data.refreshToken);
    await getUser();
  };

  if (isNewUser === "false")
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );

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
