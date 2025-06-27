import { Inputbox } from "@/shared/components";
import { clsx } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SocketContext } from "../../provider/socketProvider";
import useUserStore from "@/shared/stores/useUserStore";
import ChatMessageCard from "./chatMessageCard";

interface ChatRoomProps {
  type: "ALL" | "MANITO" | "MANITI";
  roomId: number;
}

export default function ChatRoom({ type = "ALL", roomId }: ChatRoomProps) {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const socket = useContext(SocketContext);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (!socket) return;
    socket.subscribe(`/sub/${roomId}`, (message) => {
      const parsedMessage = JSON.parse(message.body);
      console.log(parsedMessage);
      setMessageList((prev) => [...prev, parsedMessage.message]);
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
            {messageList.map((message, idx) => (
              <ChatMessageCard
                type={type}
                isSender={true}
                key={idx}
                message={message}
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
              socket?.publish({
                destination: `/sub/${roomId}`, // Specify the destination topic
                body: JSON.stringify({
                  message: message,
                  senderId: user?.searchId,
                }),
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
