import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { View } from "react-native";

export default function StartGuide() {
  return (
    <View className="flex w-full px-4 py-4 bg-inactive-background rounded-md my-4 gap-1">
      <Typography
        label="게임이 시작된 이후에는 방 설정을 변경할 수 없습니다."
        color={COLOR.INACTIVE}
        style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
      />
      <Typography
        label="게임 프로필, 게임 닉네임은 게임 시작 후 설정 가능합니다."
        color={COLOR.INACTIVE}
        style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
      />
      <Typography
        label="게임이 시작되면 미션이 주어지고, 이후 미션 주기마다 새로운 미션이 주어집니다."
        color={COLOR.INACTIVE}
        style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
      />
    </View>
  );
}
