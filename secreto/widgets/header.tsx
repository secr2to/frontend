import { Typography } from "@/shared/components";
import { Image, View, Pressable } from "react-native";
import back from "@/shared/images/back.png";
import { useNavigation } from "@react-navigation/native";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import Secreto from "@/shared/images/secreto.svg";
import alarm from "@/shared/images/alarm.png";
import { Suspense } from "react";
import React from "react";
import { canGoBack } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import NoticeCountFallback from "./components/noticeCountFallback";
import NoticeCount from "./components/noticeCount";

export const BackButton = () => {
  const navigation = useNavigation();
  return canGoBack() ? (
    <Pressable
      onPress={() => {
        canGoBack() && navigation.goBack();
      }}
      className="px-5 py-2"
    >
      <Image source={back} style={{ width: 30, height: 30 }} />
    </Pressable>
  ) : (
    <></>
  );
};

export const CustomTitle = ({ title }: { title?: string }) => {
  return title ? (
    <Typography
      label={title}
      style={TYPOGRAPHY_TYPE.MAIN_TITLE}
      color={COLOR.BASE}
    />
  ) : (
    <Secreto />
  );
};

export const Alarm = () => {
  return (
    <Pressable
      className="px-5 py-2"
      onPress={() => {
        router.push("/(afterLogin)/notification");
      }}
    >
      <Image source={alarm} className="size-6" />
      <Suspense fallback={<NoticeCountFallback />}>
        <NoticeCount />
      </Suspense>
    </Pressable>
  );
};
