import React, { Dispatch, SetStateAction, useState } from "react";
import { View, TextInput, Image } from "react-native";
import { clsx } from "../../utils";

interface SearchInputBoxProps {
  placeholder?: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  className?: string;
}

export default function SearchInputBox({
  placeholder = "PLACEHOLDER",
  value = "",
  setValue,
  className,
}: SearchInputBoxProps) {
  return (
    <View
      className={clsx(
        "bg-base-background relative w-full p-2 border-[2px] rounded-[4px] border-grayLight",
        className
      )}
    >
      <View className="flex-1 flex-row items-center gap-2">
        <Image
          source={require("@/shared/images/magnify.svg")}
          style={{ width: 20, height: 20 }}
        />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          className="flex w-full focus:outline-none text-[16px] placeholder:text-grayDark"
        />
      </View>
    </View>
  );
}
