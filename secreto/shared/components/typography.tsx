import { Text } from "react-native";
import { clsx } from "../utils";

interface TypographyProps {
  label: string;
  style?:
    | "mainTitle"
    | "main"
    | "subTitle"
    | "sub"
    | "bodyTitle"
    | "body"
    | "captionTitle"
    | "caption"
    | "labelTitle"
    | "label";
}

const styleMap: { [key in NonNullable<TypographyProps["style"]>]: string } = {
  mainTitle: "text-base font-bold",
  main: "text-base font-normal",
  subTitle: "text-sm font-bold",
  sub: "text-sm font-normal",
  bodyTitle: "text-xs font-bold",
  body: "text-xs font-normal",
  captionTitle: "text-[10px] font-bold",
  caption: "text-[10px] font-normal",
  labelTitle: "text-[8px] font-bold",
  label: "text-[8px] font-normal",
};

export default function Typography({ label, style = "body" }: TypographyProps) {
  return (
    <Text
      className={(clsx(styleMap[style]), "text-black dark:text-white-dark")}
    >
      {label}
    </Text>
  );
}
