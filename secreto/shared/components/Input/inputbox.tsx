import React, { Dispatch, SetStateAction, useState } from "react";
import { View, TextInput } from "react-native";
import { clsx } from "../../utils";

interface InputboxProps {
  placeholder?: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>> | ((value: string) => void);
  className?: string;
  readonly?: boolean;
}

export default function Inputbox({
  placeholder,
  value = "",
  setValue,
  className,
  readonly = false,
}: InputboxProps) {
  return (
    <View
      className={clsx(
        "bg-base-background relative w-full p-2 h-[36px] border rounded-[4px] border-grayLight",
        value && "border-b-[3px] border-b-active-background",
        className
      )}
    >
      <TextInput
        className="flex w-full items-center focus:outline-none text-center text-[16px] placeholder:text-grayDark"
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        aria-disabled={!setValue || readonly}
      />
    </View>
  );
}
