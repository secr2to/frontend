import RegistEndDate from "@/entities/room/regist/components/endDate";
import { useGetRoomInfo } from "@/entities/room/regist/query/useGetRoomInfo";
import { useChangeRoomInfo } from "@/entities/room/setting/query/useChangeRoomInfo";
import { Button } from "@/shared/components";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function EndDatePage() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: roomInfo, isLoading } = useGetRoomInfo(roomId as string);
  const { mutate } = useChangeRoomInfo();
  const [date, setDate] = useState<Date>(new Date());

  return (
    <View className="flex-1 bg-default-background">
      <View className="flex flex-col w-full items-center py-10 px-5">
        <RegistEndDate date={date} setDate={setDate} />
      </View>
      <View className="absolute bottom-10 px-5 flex w-full">
        <Button
          label="확인"
          size="medium"
          disabled={!roomId || !date || !roomInfo?.missionPeriod}
          onPress={() =>
            roomInfo &&
            mutate({
              roomId,
              endDate: date.toISOString().split("T")[0] + "T00:00:00",
              missionPeriod: roomInfo?.missionPeriod ?? "1",
            })
          }
        />
      </View>
    </View>
  );
}
