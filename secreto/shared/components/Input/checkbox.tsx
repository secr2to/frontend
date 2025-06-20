import React from "react";
import { Pressable, Text, View } from "react-native";
import { clsx } from "@/shared/utils";
import Typography from "../Typography/typography";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="flex flex-row items-center gap-2"
    >
      <View
        className={clsx(
          "w-5 h-5 border rounded-md flex items-center justify-center",
          checked ? "bg-primary border-primary" : "bg-white border-gray-300"
        )}
      >
        {checked && <Text className="text-white">✔</Text>}
      </View>
      <Typography label={label} />
    </Pressable>
  );
}
