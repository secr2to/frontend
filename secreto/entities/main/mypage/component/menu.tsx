import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Image, Pressable, View } from "react-native";

interface MenuProps {
  label: string;
  value?: string;
  route?: () => void;
}

export default function Menu({ label, value, route }: MenuProps) {
  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-row w-full justify-between">
        <Typography label={label} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
        <Pressable onPress={route}>
          <View className="flex flex-row items-center">
            {value && (
              <Typography
                label={value}
                style={TYPOGRAPHY_TYPE.SUB_REGULAR}
                color={COLOR.INACTIVE}
              />
            )}
            {route && (
              <Image
                source={require("@/shared/images/back.png")}
                className="size-6 rotate-180"
              />
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}
