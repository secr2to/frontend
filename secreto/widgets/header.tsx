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
import { useEffect, useState } from "react";
import React from "react";
import { canGoBack } from "expo-router/build/global-state/routing";

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        canGoBack() && navigation.goBack();
      }}
      className="px-5 py-2"
    >
      <Image source={back} style={{ width: 30, height: 30 }} />
    </Pressable>
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

export const Alarm = ({ notice = 0 }: { notice?: number }) => {
  const [noticeLabel, setNoticeLabel] = useState<string>("");

  useEffect(() => {
    if (notice === 0) {
      setNoticeLabel("");
    } else if (notice < 100) {
      setNoticeLabel(notice.toString());
    } else {
      setNoticeLabel("99+");
    }
  }, [notice]);

  return (
    <Pressable
      className="px-5 py-2"
      onPress={() => {
        //TODO: history page redirect
      }}
    >
      <Image source={alarm} style={{ width: 30, height: 30 }} />
      {noticeLabel && (
        <View className="absolute flex items-center justify-center size-6 inset-0 left-[30px] bg-error rounded-full">
          <Typography
            label={noticeLabel}
            style={TYPOGRAPHY_TYPE.LABEL_BOLD}
            color={COLOR.WHITE}
          />
        </View>
      )}
    </Pressable>
  );
};
