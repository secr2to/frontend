import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Image, Pressable, View } from "react-native";

interface RoomInfoProps {
  route?: () => void;
  label: string;
  value?: string;
}

export default function RoomInfo({ route, label, value }: RoomInfoProps) {
  return (
    <Pressable onPress={route}>
      <View className="flex w-full flex-row justify-between items-center">
        <Typography label={label} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
        <View className="flex flex-row items-center gap-2">
          {value && (
            <Typography
              label={value}
              style={TYPOGRAPHY_TYPE.MAIN_REGULAR}
              color={COLOR.INACTIVE}
            />
          )}
          {route && (
            <Image
              source={require("@/shared/images/back.png")}
              className="w-6 h-6 rotate-180"
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}
