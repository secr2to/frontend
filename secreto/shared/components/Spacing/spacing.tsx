import { View } from "react-native";

interface SpacingProps {
  size: number;
}

export default function Spacing({ size }: SpacingProps) {
  return <View style={{ width: "100%", height: size }} />;
}
