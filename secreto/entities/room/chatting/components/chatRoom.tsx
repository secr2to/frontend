import { Inputbox } from "@/shared/components";
import { clsx } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SocketContext } from "../../provider/socketProvider";
import ChatMessageCard from "./chatMessageCard";
import { useSendMessage } from "../query/useSendMessage";
import { chattingMessageType } from "../type/type";
import { useGetMyInfo } from "../../common/query/useGetMyInfo";

interface ChatRoomProps {
  type: "ALL" | "MANITO" | "MANITI";
  roomId: number;
}

export default function ChatRoom({ type = "ALL", roomId }: ChatRoomProps) {
  const [messageList, setMessageList] = useState<chattingMessageType[]>([]);
  const [message, setMessage] = useState<string>("");
  const { mutate } = useSendMessage();
  const socket = useContext(SocketContext);
  const { data: myInfo } = useGetMyInfo(roomId);

  useEffect(() => {
    if (!socket) return;
    socket.subscribe(`/sub/${roomId}`, (message) => {
      const parsedMessage: chattingMessageType = JSON.parse(message.body);
      setMessageList((prevMessage) => [...prevMessage, parsedMessage]);
    });

    return () => {
      socket.unsubscribe(`/sub/${roomId}`);
    };
  }, [socket]);

  return (
    <View className={clsx("z-0 flex-1")}>
      <View className="flex-1 pb-16">
        <ScrollView>
          <View className="flex flex-col gap-5">
            {messageList.map((messageData, idx) => (
              <ChatMessageCard
                type={type}
                isSender={messageData.writerId === myInfo?.roomUserId}
                key={messageData.chattingMessageId}
                messageData={messageData}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="absolute bottom-0 flex w-full flex-row gap-4 items-center">
        <View className="w-[85%]">
          <Inputbox
            multiline={true}
            value={message}
            setValue={setMessage}
            className="w-[80%]"
            activeBorder={false}
          />
        </View>
        <View
          className={clsx(
            "px-2 py-1 rounded-md",
            type === "ALL"
              ? "bg-primary"
              : type === "MANITO"
              ? "bg-secondary"
              : "bg-primary2",
            !message.trim() && "opacity-50"
          )}
        >
          <Pressable
            disabled={!message.trim()}
            onPress={() => {
              mutate({
                roomId: roomId,
                writerId: 1,
                content: message,
              });
              setMessage("");
            }}
          >
            <Image
              source={require("@/shared/images/send.png")}
              className="size-8"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
