import { Inputbox } from "@/shared/components";
import { clsx } from "@/shared/utils";
import { useContext, useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import ChatMessageCard from "./chatMessageCard";
import { useSendMessage } from "../query/useSendMessage";
import { participant, message, chattingMessagesResponse } from "../type/type";
import { SocketContext } from "@/shared/websocket/provider/globalSocketProvider";
import { useGetChattings } from "../query/useGetChattings";
import { useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMyInfo } from "../../common/query/useGetMyInfo";

interface ChatRoomProps {
  type: "ALL" | "MANITO" | "MANITI";
  chatRoomId: number;
  participants?: participant[];
}

export default function ChatRoom({
  type,
  chatRoomId,
  participants,
}: ChatRoomProps) {
  const [message, setMessage] = useState<string>("");
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: myInfo } = useGetMyInfo(roomId);
  const { data: messages } = useGetChattings(roomId, type);
  const { mutate } = useSendMessage();
  const socket = useContext(SocketContext);
  const scrollViewRef = useRef<ScrollView>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    console.log("roomId:", roomId, "type:", type, "chatRoomId:", chatRoomId);

    socket.subscribe(`/sub/chatting/${chatRoomId}`, (message) => {
      const parsedMessage: message = JSON.parse(message.body);

      queryClient.setQueryData(
        ["chattingMessages", roomId, type],
        (messageResponse: chattingMessagesResponse) => {
          const currentMessages = messageResponse?.data || [];
          return {
            ...messageResponse,
            data: [...currentMessages, parsedMessage],
          };
        }
      );
    });

    return () => {
      socket.unsubscribe(`/sub/chatting/${chatRoomId}`);
    };
  }, [socket, roomId, type]);

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
            {messages?.map((messageData, idx) => (
              <ChatMessageCard
                type={type}
                isSender={messageData.writerId === myInfo?.roomUserId}
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
              myInfo &&
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
