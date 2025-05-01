import React, { Dispatch, SetStateAction } from "react";
import { View, Image, Pressable } from "react-native";
import Button from "../Button/button";
import { BUTTON_SIZE, BUTTON_STYLE } from "../Button/constant";

interface PopupProps {
  children?: React.ReactNode[] | React.ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
  confirmLabel?: string;
  onSuccess?: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
}

export default function CardPopup({
  onClose,
  children,
  confirmLabel,
  onSuccess,
  cancelLabel,
  onCancel,
}: PopupProps) {
  return (
    <View className="z-[0] absolute px-[10px] inset-0 w-full h-full">
      <View className="absolute inset-0 bg-black opacity-80" />
      <View className="m-auto w-full bg-base-background rounded-lg shadow-lg py-5 flex flex-col">
        <Pressable
          onPress={() => onClose((prev) => !prev)}
          className="absolute top-[5%] right-[5%] size-6 rounded-full"
        >
          <Image
            source={require("@/shared/images/close.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </Pressable>
        <View className="flex flex-col py-5 gap-2 items-center flex-grow">
          {children}
        </View>
        <View className="flex flex-row px-4 w-full gap-2 justify-between">
          {confirmLabel && (
            <Button
              onPress={onSuccess}
              size={BUTTON_SIZE.LARGE}
              label={confirmLabel}
              style={BUTTON_STYLE.ACTIVE}
            />
          )}
          {cancelLabel && (
            <Button
              onPress={onCancel}
              size={BUTTON_SIZE.LARGE}
              label={cancelLabel}
              style={BUTTON_STYLE.REVERSE}
            />
          )}
        </View>
      </View>
    </View>
  );
}
