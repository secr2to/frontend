import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { BackButton } from "@/widgets/header";
import { useThemeColors } from "@/shared/themes/useTheme";
import { useGetRoomInfo } from "@/entities/room/regist/query/useGetRoomInfo";

export default function RoomLayout() {
  const useColor = useThemeColors();
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: roomInfo, isLoading } = useGetRoomInfo(roomId);

  if (!isLoading && roomInfo?.status !== "WAITING") {
    return <Redirect href={`/(afterLogin)/room/${roomId}/(afterStart)/feed`} />;
  }

  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerStyle: { backgroundColor: useColor.baseBackground },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="endDate"
        options={{
          headerTitle: "마니또 종료일",
        }}
      />
      <Stack.Screen
        name="missionPeriod"
        options={{
          headerTitle: "마니또 미션 주기",
        }}
      />
      <Stack.Screen
        name="roomProfile"
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: "방 이미지 수정",
        }}
      />
    </Stack>
  );
}
