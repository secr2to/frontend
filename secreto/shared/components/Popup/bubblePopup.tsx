import React, { Dispatch, SetStateAction } from "react";
import { View, Image } from "react-native";
import Typography from "../Typography/typography";
import { TYPOGRAPHY_TYPE } from "../Typography/constant";
import { BUTTON_SIZE, BUTTON_STYLE } from "../Button/constant";
import Button from "../Button/button";
import Spacing from "../Spacing/spacing";
import { clsx } from "@/shared/utils";

interface BubblePopupProps {
  content: string;
  buttonLabel: string;
  onPress: () => void;
  className?: string;
}

export default function BubblePopup({
  content,
  buttonLabel,
  onPress,
  className,
}: BubblePopupProps) {
  return (
    <View
      className={clsx(
        "z-[1] absolute px-[10px] inset-0 w-full h-full flex justify-end",
        className
      )}
    >
      <View className="absolute inset-0 bg-black opacity-80" />
      <View className="relative flex flex-col w-full bottom-[10px]">
        <View className="bg-white border-primary border relative py-4 rounded-[5px]">
          <Typography
            style={TYPOGRAPHY_TYPE.SUB_REGULAR}
            label={content}
            className="text-center text-black"
          />
          <View
            className="
              absolute
              left-[calc(66.666666%-1px)]
              -bottom-[21px]
              w-0
              h-0
              border-t-[21px] border-t-primary
              border-l-0
              border-b-0
              border-r-[41px] border-r-transparent
            "
          />
          <View
            className="
              absolute
              left-2/3
              -bottom-[19px]
              w-0
              h-0
              border-t-[20px] border-t-white
              border-l-0
              border-b-0
              border-r-[40px] border-r-transparent
            "
          />
        </View>
        <Spacing size={30} />
        <Button
          style={BUTTON_STYLE.ACTIVE}
          size={BUTTON_SIZE.LARGE}
          label={buttonLabel}
          onPress={onPress}
        />
      </View>
    </View>
  );
}
