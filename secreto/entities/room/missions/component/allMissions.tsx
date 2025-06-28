import { Typography } from "@/shared/components";
import { View } from "react-native";
import MissionList from "./missionList";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { useLocalSearchParams } from "expo-router";
import { useGetGameMissions } from "../query/useGetGameMissions";

export default function AllMissions() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: missions } = useGetGameMissions(roomId);
  return (
    <View className="flex-1 gap-4">
      <View className="flex gap-4">
        <View className="flex flex-row w-full justify-center gap-10">
          <Typography
            label="다음 미션 예정일"
            style={TYPOGRAPHY_TYPE.MAIN_TITLE}
          />
          <Typography
            label="2025년 5월 12일"
            style={TYPOGRAPHY_TYPE.MAIN_REGULAR}
          />
        </View>
        <Typography
          label="다음 중 하나의 미션이 랜덤하게 주어집니다"
          style={TYPOGRAPHY_TYPE.SUB_REGULAR}
          className="text-center"
        />
      </View>
      <View className="flex-1">
        <MissionList missions={missions} />
      </View>
    </View>
  );
}
