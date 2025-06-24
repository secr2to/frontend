import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { View } from "react-native";

interface StartGuideProps {
  isManager?: boolean;
}

export default function StartGuide({ isManager = false }: StartGuideProps) {
  return (
    <View className="flex w-full px-4 py-4 bg-inactive-background rounded-md my-4 gap-1">
      {isManager && (
        <>
          <Typography
            label="게임이 시작된 이후에는 방 설정을 변경할 수 없습니다."
            color={COLOR.INACTIVE}
            style={TYPOGRAPHY_TYPE.BODY_REGULAR}
          />
          <Typography
            label="게임 프로필, 게임 닉네임은 게임 시작 후 설정 가능합니다."
            color={COLOR.INACTIVE}
            style={TYPOGRAPHY_TYPE.BODY_REGULAR}
          />
          <Typography
            label="게임이 시작되면 미션이 주어지고, 이후 미션 주기마다 새로운 미션이 주어집니다."
            color={COLOR.INACTIVE}
            style={TYPOGRAPHY_TYPE.BODY_REGULAR}
          />
        </>
      )}
      {!isManager && (
        <>
          <Typography
            label="게임이 시작 전 대기 화면입니다."
            color={COLOR.INACTIVE}
            style={TYPOGRAPHY_TYPE.BODY_REGULAR}
          />
          <Typography
            label="게임이 시작되면 자동으로 화면이 전환됩니다."
            color={COLOR.INACTIVE}
            style={TYPOGRAPHY_TYPE.BODY_REGULAR}
          />
          <Typography
            label="게임이 시작되면 미션탭에 설정된 미션이 랜덤으로 주어지고, 이후 미션 주기마다 새로운 미션이 주어집니다."
            color={COLOR.INACTIVE}
            style={TYPOGRAPHY_TYPE.BODY_REGULAR}
          />
        </>
      )}
    </View>
  );
}
