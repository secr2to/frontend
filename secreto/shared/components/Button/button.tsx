import { Pressable } from "react-native";
import { BUTTON_SIZE, BUTTON_STYLE } from "./constant";
import { buttonSize, colorStyle, labelStyle } from "./styles";
import { clsx } from "@/shared/utils";
import Typography from "../Typography/typography";
import { TYPOGRAPHY_TYPE } from "../Typography/constant";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  className?: string;
  size?: (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];
  style?: (typeof BUTTON_STYLE)[keyof typeof BUTTON_STYLE];
  disabled?: boolean;
}

export default function Button({
  label,
  onPress,
  className,
  size = BUTTON_SIZE.MENU,
  style = BUTTON_STYLE.ACTIVE,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "rounded-[5px] active:opacity-70",
        buttonSize(size),
        colorStyle(style),
        className,
        disabled && "opacity-50"
      )}
      disabled={disabled}
    >
      <Typography
        style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        label={label}
        color={labelStyle(style)}
      />
    </Pressable>
  );
}
