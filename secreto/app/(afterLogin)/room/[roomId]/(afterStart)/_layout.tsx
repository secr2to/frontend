import Layout from "@/widgets/Layout/layout";
import { inGameNavData } from "@/widgets/Layout/data";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useGetRoomInfo } from "@/entities/room/regist/query/useGetRoomInfo";
export default function RoomLayout() {
  const { roomId } = useLocalSearchParams();
  const { data } = useGetRoomInfo(roomId as string);

  if (data && data.status === "WAITING") {
    return <Redirect href={`/(afterLogin)/room/${roomId}/(beforeStart)`} />;
  }

  return <Layout navData={inGameNavData} />;
}
