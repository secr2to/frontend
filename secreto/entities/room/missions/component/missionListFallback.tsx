import { View } from "react-native";
import MissionCardFallback from "./missionCardFallback";
import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";

type MissionListFallbackProps = {
  type?: "current" | "all";
};
export default function MissionListFallback({
  type,
}: MissionListFallbackProps) {
  return (
    <>
      {type === "current" && (
        <>
          <View className="flex-1">
            <View className="flex-1 flex-col gap-10">
              <View className="relative flex w-full h-12 bg-inactive-background rounded-lg animate-pulse" />
              <View className="flex-1 gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <MissionCardFallback key={index} />
                ))}
              </View>
            </View>
          </View>
        </>
      )}
      {type === "all" && (
        <View className="flex-1 gap-4">
          <View className="flex gap-4">
            <View className="flex flex-row w-full items-center justify-center gap-10">
              <Typography
                label="다음 미션 예정일"
                style={TYPOGRAPHY_TYPE.MAIN_TITLE}
              />
              <View className="w-20 h-4 bg-inactive-background" />
            </View>
            <Typography
              label="다음 중 하나의 미션이 랜덤하게 주어집니다"
              style={TYPOGRAPHY_TYPE.SUB_REGULAR}
              className="text-center"
            />
          </View>
          <View className="flex-1 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <MissionCardFallback key={index} />
            ))}
          </View>
        </View>
      )}
    </>
  );
}
