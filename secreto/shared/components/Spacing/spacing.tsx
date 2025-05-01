import { View } from "react-native";

interface SpacingProps {
  size: number;
}

export default function Spacing({ size }: SpacingProps) {
  return (
    <View
      className="bg-default-background"
      style={{ width: "100%", height: size }}
    />
  );
}
