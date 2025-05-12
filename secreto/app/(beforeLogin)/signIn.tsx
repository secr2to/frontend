import { AuthButton, Typography } from "@/shared/components";
import { AUTH_PROVIDER } from "@/shared/components/AuthButton/constant";
import { Modal, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { Image } from "expo-image";
import BigSecreto from "@/shared/images/big-secreto.svg";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";

export default function SignIn() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 flex-col gap-6 items-center justify-center">
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
          onPress={() =>
            setAuthUrl(
              `${process.env.EXPO_PUBLIC_API_URL}/oauth2/authorization/kakao`
            )
          }
        />
        <AuthButton
          provider={AUTH_PROVIDER.NAVER}
          onPress={() =>
            setAuthUrl(
              `${process.env.EXPO_PUBLIC_API_URL}/oauth2/authorization/naver`
            )
          }
        />
        <AuthButton
          provider={AUTH_PROVIDER.GOOGLE}
          onPress={() =>
            setAuthUrl(
              `${process.env.EXPO_PUBLIC_API_URL}/oauth2/authorization/google`
            )
          }
        />
      </View>
      {authUrl && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={!!authUrl}
          onRequestClose={() => setAuthUrl(null)}
        >
          <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary2">
              <View className="h-[40px] bg-primary2">
                <TouchableOpacity
                  className="flex-row items-center justify-end h-full px-5"
                  onPress={() => setAuthUrl(null)}
                >
                  <Typography
                    label="서비스로 돌아가기"
                    style={TYPOGRAPHY_TYPE.MAIN_TITLE}
                    color={COLOR.BLACK}
                  />
                </TouchableOpacity>
              </View>
              <WebView source={{ uri: authUrl }} />
            </SafeAreaView>
          </SafeAreaProvider>
        </Modal>
      )}
    </SafeAreaView>
  );
}
