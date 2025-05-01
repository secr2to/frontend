import { Typography } from "@/shared/components";
import {
  Image,
  ImageSourcePropType,
  View,
  TouchableOpacity,
} from "react-native";
import alarm from "@/shared/images/alarm.png";
import back from "@/shared/images/back.png";
import { useNavigation } from "@react-navigation/native";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { useEffect, useState } from "react";

interface HeaderProps {
  backButton?: boolean;
  title: string | ImageSourcePropType;
  notice?: number;
}

export default function Header({
  backButton = true,
  title,
  notice = 0,
}: HeaderProps) {
  const navigation = useNavigation();
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
    <View className="relative flex flex-row items-center justify-between top-0 w-full h-[60px] bg-base-background border border-grayLight px-5">
      <View className="flex flex-row items-center">
        {backButton && navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={back} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        )}
      </View>

      <View className="absolute left-1/2 transform -translate-x-1/2">
        {typeof title === "string" ? (
          <Typography
            label={title}
            style={TYPOGRAPHY_TYPE.MAIN_TITLE}
            color={COLOR.BLACK}
          />
        ) : (
          <Image source={title} className="w-8 h-8" />
        )}
      </View>

      {noticeLabel && (
        <View className="relative flex flex-end items-center">
          <Image source={alarm} style={{ width: 22, height: 22 }} />
          <View
            className="absolute flex items-center justify-center -top-[10px] -right-[10px] px-3 py-1 bg-error rounded-full"
            style={{ width: "100%", height: "100%" }}
          >
            <Typography
              label={noticeLabel}
              style={TYPOGRAPHY_TYPE.CAPTION_BOLD}
              color={COLOR.WHITE}
            />
          </View>
        </View>
      )}
    </View>
  );
}
