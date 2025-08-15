import { Image, View } from "react-native";
import RoomCard from "./roomCard";
import { FlashList } from "@shopify/flash-list";
import { useGetRooms } from "../query/useGetRooms";
import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { Dispatch, SetStateAction, useEffect } from "react";

interface RoomListProps {
  state: "ALL" | "WAITING" | "PROGRESS" | "TERMINATED";
  setGameStatus: Dispatch<
    SetStateAction<"ALL" | "WAITING" | "PROGRESS" | "TERMINATED">
  >;
}

export default function RoomList({ state, setGameStatus }: RoomListProps) {
  const { data: rooms, isFetched } = useGetRooms(state);

  useEffect(() => {
    if (rooms?.length === 0) {
      setGameStatus("ALL");
    }
  }, [rooms, setGameStatus]);

  if (rooms.length === 0 && isFetched) {
    return (
      <View className="flex-1 items-center justify-center gap-4">
        <Image
          source={require("@/shared/images/default.png")}
          className="size-48"
          resizeMode="contain"
        />
        <Typography
          label={"현재 상태에 맞는 방이 없습니다."}
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
      </View>
    );
  }

  return (
    <FlashList
      data={rooms}
      renderItem={({ item: room }) => (
        <View className="px-5">
          <RoomCard
            roomUserCount={room.roomUserCount}
            roomId={room.roomId}
            name={room.name}
            status={room.status}
            code={room.code}
            startDate={room.startDate?.toString().split("T")[0]}
            endDate={room.endDate?.toString().split("T")[0]}
            missionPeriod={room.missionPeriod}
            imageUrl={room.imageUrl}
            nickname={room.nickname}
          />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      estimatedItemSize={200}
      contentContainerStyle={{ paddingBottom: 60 }}
    />
  );
}
