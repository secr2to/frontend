import SocketProvider from "@/entities/room/provider/socketProvider";
import { Stack } from "expo-router";
export default function RoomLayout() {
  return (
    <SocketProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SocketProvider>
  );
}
