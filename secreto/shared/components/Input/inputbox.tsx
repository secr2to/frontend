import React, { Dispatch, SetStateAction, useRef } from "react";
import { View, TextInput } from "react-native";
import { clsx } from "../../utils";

interface InputboxProps {
  placeholder?: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>> | ((value: string) => void);
  className?: string;
  readonly?: boolean;
  activeBorder?: boolean;
  multiline?: boolean;
}

export default function Inputbox({
  placeholder,
  value = "",
  setValue,
  className,
  readonly = false,
  activeBorder = true,
  multiline = false,
}: InputboxProps) {
  const inputRef = useRef<TextInput>(null);
  return (
    <View
      className={clsx(
        "bg-base-background relative w-full p-2 border rounded-[4px] border-grayLight",
        value && activeBorder && "border-b-[3px] border-b-active-background",
        multiline ? "h-auto" : "h-[36px]",
        className
      )}
      onTouchStart={() => inputRef.current?.focus()} // Focus on touch
    >
      <TextInput
        ref={inputRef}
        className="flex w-full items-center focus:outline-none text-center text-[16px] placeholder:text-grayDark"
        placeholder={placeholder}
        multiline={multiline}
        value={value}
        onChangeText={setValue}
        aria-disabled={!setValue || readonly}
      />
    </View>
  );
}
