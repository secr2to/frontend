import { Text } from "react-native";
import { clsx } from "../../utils";
import { colorStyle, textStyle } from "./styles";
import { COLOR, TYPOGRAPHY_TYPE } from "./constant";

interface TypographyProps {
  label: string;
  style?: (typeof TYPOGRAPHY_TYPE)[keyof typeof TYPOGRAPHY_TYPE];
  color?: (typeof COLOR)[keyof typeof COLOR];
  className?: string;
}

export default function Typography({
  label,
  style = TYPOGRAPHY_TYPE.BODY_REGULAR,
  color = COLOR.DEFAULT,
  className,
}: TypographyProps) {
  return (
    <Text className={clsx(textStyle(style), colorStyle(color), className)}>
      {label}
    </Text>
  );
}
