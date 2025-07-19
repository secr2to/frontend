import { View } from "react-native";
import { PROFILE_SIZE } from "../Profile/constant";
import { clsx } from "@/shared/utils";
import { imageStyle } from "../Profile/styles";

interface ProfileFallbackProps {
  size?: (typeof PROFILE_SIZE)[keyof typeof PROFILE_SIZE];
}

export default function ProfileFallback({
  size = PROFILE_SIZE.MEDIUM,
}: ProfileFallbackProps) {
  return (
    <View
      className={clsx(
        imageStyle(size),
        "rounded-full bg-inactive-background animate-pulse"
      )}
    ></View>
  );
}
