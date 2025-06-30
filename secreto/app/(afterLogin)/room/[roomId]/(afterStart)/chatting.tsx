import ChatRoom from "@/entities/room/chatting/components/chatRoom";
import { useGetChatRooms } from "@/entities/room/chatting/query/useGetChatRooms";
import { useGetChattingMembers } from "@/entities/room/chatting/query/useGetChattingMemebers";
import { useGetChattings } from "@/entities/room/chatting/query/useGetChattings";
import { participant } from "@/entities/room/chatting/type/type";
import { useGetMyInfo } from "@/entities/room/common/query/useGetMyInfo";
import { NavMenu } from "@/shared/components";
import { clsx } from "@/shared/utils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Chatting() {
  const [roomType, setRoomType] = useState("ALL");
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: chatRooms } = useGetChatRooms(roomId);
  const { data: myInfo } = useGetMyInfo(roomId);
  const { data: chattingMembers } = useGetChattingMembers(roomId);
  const [participants, setParticipants] = useState<participant[]>([]);
  const { data: allMessages, refetch: refetchAll } = useGetChattings(
    roomId,
    "ALL"
  );
  const { data: manitoMessages, refetch: refetchManito } = useGetChattings(
    roomId,
    "MANITO"
  );
  const { data: manitiMessages, refetch: refetchManiti } = useGetChattings(
    roomId,
    "MANITI"
  );

  const getChatId = (type: "ALL" | "MANITO" | "MANITI") => {
    return (
      chatRooms?.filter((room) => room.type === type)[0].chattingRoomId || -1
    );
  };

  useEffect(() => {
    if (!chattingMembers || roomType === "MANITO") return;

    const chatRoomId = getChatId(roomType as "ALL" | "MANITI");
    const participantsList = chattingMembers.find(
      (data) => data.chattingRoomId === chatRoomId
    )?.participationInfoList;
    setParticipants(participantsList || []);
  }, [chattingMembers, roomType]);

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
        {roomType === "ALL" && myInfo && allMessages && (
          <ChatRoom
            type="ALL"
            chatRoomId={getChatId("ALL")}
            myInfo={myInfo}
            participants={participants}
            messageList={allMessages}
            refetch={refetchAll}
          />
        )}
        {roomType === "MANITO" && myInfo && manitoMessages && (
          <ChatRoom
            type="MANITO"
            chatRoomId={getChatId("MANITO")}
            myInfo={myInfo}
            messageList={manitoMessages}
            refetch={refetchManito}
          />
        )}
        {roomType === "MANITI" && myInfo && manitiMessages && (
          <ChatRoom
            type="MANITI"
            chatRoomId={getChatId("MANITI")}
            myInfo={myInfo}
            participants={participants}
            messageList={manitiMessages}
            refetch={refetchManiti}
          />
        )}
      </View>
    </View>
  );
}
