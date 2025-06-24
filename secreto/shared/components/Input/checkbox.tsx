import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { clsx } from "@/shared/utils";
import Typography from "../Typography/typography";
import { TYPOGRAPHY_TYPE } from "../Typography/constant";

interface CheckboxProps {
  label?: string;
  check?: boolean;
  onChecked?: () => void;
  onUnchecked?: () => void;
}

export default function Checkbox({
  label,
  check = false,
  onChecked,
  onUnchecked,
}: CheckboxProps) {
  const [checked, setChecked] = useState(check);
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (checked) {
      onChecked?.();
    } else {
      onUnchecked?.();
    }
  }, [checked]);

  return (
    <Pressable
      onPress={() => handleCheck()}
      className="flex flex-row items-center justify-center gap-2"
    >
      <View
        className={clsx(
          "w-6 h-6 border rounded-md flex items-center justify-center",
          checked
            ? "bg-active-background border-primary"
            : "bg-inactive-background border-inactive-background"
        )}
      >
        {checked && <Typography label="✔" />}
      </View>
      {label && <Typography label={label} style={TYPOGRAPHY_TYPE.BODY_BOLD} />}
    </Pressable>
  );
}
