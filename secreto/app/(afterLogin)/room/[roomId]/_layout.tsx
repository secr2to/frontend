import RoomSocket from "@/entities/room/provider/RoomSocket";
import { Stack } from "expo-router";
export default function RoomLayout() {
  return (
    <RoomSocket>
      <Stack screenOptions={{ headerShown: false }} />
    </RoomSocket>
  );
}
