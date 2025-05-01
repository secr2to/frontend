import { Image, Pressable, View } from "react-native";
import { buttonImage, buttonLabel, containerStyle, labelStyle } from "./styles";
import { clsx } from "@/shared/utils";
import { AUTH_PROVIDER } from "./constant";
import { TYPOGRAPHY_TYPE } from "../Typography/constant";
import Typography from "../Typography/typography";

interface AuthButtonProps {
  provider: (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
  onPress: () => void;
}

export default function AuthButton({ provider, onPress }: AuthButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "flex items-center justify-center h-[50px] rounded-[5px] overflow-hidden",
        containerStyle(provider)
      )}
    >
      <View className="flex flex-row w-[140px] justify-start items-center gap-2">
        <Image
          source={buttonImage(provider)}
          style={{ width: 30, height: 30 }}
        />
        <View className="flex-1 items-center justify-center">
          <Typography
            label={buttonLabel(provider)}
            style={TYPOGRAPHY_TYPE.MAIN_REGULAR}
            color={labelStyle(provider)}
          />
        </View>
      </View>
    </Pressable>
  );
}
