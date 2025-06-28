import { View } from "react-native";
import { useGetGameMissions } from "../query/useGetGameMissions";
import { useLocalSearchParams } from "expo-router";
import MissionList from "./missionList";

export default function CurrentMissions() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: missions } = useGetGameMissions(roomId, true);
  //   const calculateWidth = (current: number, total: number) =>
  //     (current / total) * 100;

  return (
    <View className="flex-1">
      <View className="flex-1 flex-col gap-10">
        {/* <View className="relative flex w-full h-12 bg-inactive-background rounded-lg">
          <View
            className="flex-1 bg-primary rounded-lg animate-pulse"
            style={{
              width: `${calculateWidth(current, total)}%`,
              height: "100%",
            }}
          ></View>
          <View className="absolute inset-0 flex items-center justify-center">
            <Typography
              label="진행중"
              color={COLOR.BLACK}
              style={TYPOGRAPHY_TYPE.MAIN_TITLE}
            />
          </View>
        </View> */}
        <View className="flex-1">
          <MissionList missions={missions} />
        </View>
      </View>
    </View>
  );
}
