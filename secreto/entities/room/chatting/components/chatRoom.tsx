import { Inputbox } from "@/shared/components";
import { clsx } from "@/shared/utils";
import { useContext, useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SocketContext } from "../../provider/socketProvider";
import ChatMessageCard from "./chatMessageCard";
import { useSendMessage } from "../query/useSendMessage";
import { participant, message } from "../type/type";
import { myInfo } from "../../common/type/type";

interface ChatRoomProps {
  type: "ALL" | "MANITO" | "MANITI";
  chatRoomId: number;
  myInfo: myInfo;
  participants?: participant[];
  messageList: message[];
  refetch: () => void;
}

export default function ChatRoom({
  type,
  chatRoomId,
  myInfo,
  participants,
  messageList,
  refetch,
}: ChatRoomProps) {
  const [messages, setMessages] = useState<message[]>(messageList);
  const [message, setMessage] = useState<string>("");
  const { mutate } = useSendMessage();
  const socket = useContext(SocketContext);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.subscribe(`/sub/${chatRoomId}`, (message) => {
      const parsedMessage: message = JSON.parse(message.body);
      setMessages((prevMessage) => [...prevMessage, parsedMessage]);
    });

    return () => {
      socket.unsubscribe(`/sub/${chatRoomId}`);
    };
  }, [socket]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [messages]);

  return (
    <View className={clsx("z-0 flex-1")}>
      <View className="flex-1 pb-16">
        <ScrollView ref={scrollViewRef}>
          <View className="flex flex-col gap-2">
            {messages.map((messageData, idx) => (
              <ChatMessageCard
                type={type}
                isSender={messageData.writerId === myInfo.roomUserId}
                name={
                  type === "MANITO"
                    ? "당신의 마니또"
                    : participants?.find(
                        (participant) =>
                          participant.roomUserId === messageData.writerId
                      )?.nickname
                }
                key={idx.toString()}
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
                roomId: chatRoomId,
                writerId: myInfo.roomUserId,
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
