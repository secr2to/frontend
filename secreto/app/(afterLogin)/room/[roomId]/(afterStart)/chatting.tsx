import ChatRoom from "@/entities/room/chatting/components/chatRoom";
import { useGetChatRooms } from "@/entities/room/chatting/query/useGetChatRooms";
import { NavMenu, Typography } from "@/shared/components";
import { clsx } from "@/shared/utils";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Chatting() {
  const [roomType, setRoomType] = useState("ALL");
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: chatRooms } = useGetChatRooms(roomId);

  const getChatId = (type: "ALL" | "MANITO" | "MANITI") => {
    return (
      chatRooms?.filter((room) => room.type === type)[0].chattingRoomId || -1
    );
  };

  const items = [
    {
      label: "전체",
      state: "ALL",
    },
    {
      label: "마니또와 채팅",
      state: "MANITO",
    },
    {
      label: "마니띠와 채팅",
      state: "MANITI",
    },
  ];
  return (
    <View className="flex-1 bg-default-background">
      <View
        className={clsx(
          "absolute z-0 w-full h-full",
          roomType === "ALL"
            ? "bg-primary opacity-10"
            : roomType === "MANITO"
            ? "bg-secondary opacity-20"
            : "bg-primary2 opacity-30"
        )}
      />
      <NavMenu items={items} state={roomType} setState={setRoomType} />
      <View className="flex-1 p-5">
        {roomType === "ALL" && (
          <ChatRoom type="ALL" roomId={getChatId("ALL")} />
        )}
        {roomType === "MANITO" && (
          <ChatRoom type="MANITO" roomId={getChatId("MANITO")} />
        )}
        {roomType === "MANITI" && (
          <ChatRoom type="MANITI" roomId={getChatId("MANITI")} />
        )}
      </View>
    </View>
  );
}
