import RegistMissionPeriod from "@/entities/room/regist/components/missionPeriod";
import { useGetRoomInfo } from "@/entities/room/regist/query/useGetRoomInfo";
import { useChangeRoomInfo } from "@/entities/room/setting/query/useChangeRoomInfo";
import { Button } from "@/shared/components";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function EndDatePage() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: roomInfo } = useGetRoomInfo(roomId as string);
  const { mutate } = useChangeRoomInfo();
  const [missionPeriod, setMissionPeriod] = useState<string>("1");
  return (
    <View className="flex-1 bg-default-background">
      <View className="flex flex-col w-full items-center py-10 px-5">
        <RegistMissionPeriod
          missionPeriod={missionPeriod}
          setMissionPeriod={setMissionPeriod}
        />
      </View>
      <View className="absolute bottom-10 px-5 flex w-full">
        <Button
          label="확인"
          size="medium"
          onPress={() =>
            roomInfo &&
            mutate({
              roomId,
              endDate: roomInfo?.endDate,
              missionPeriod: missionPeriod,
            })
          }
        />
      </View>
    </View>
  );
}
