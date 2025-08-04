import { getAccessToken } from "@/shared/stores/storage";
import { Client } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { user_noticeType } from "../../type/noticeType";

export const SocketContext = createContext<Client | null>(null);

export default function GlobalSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = useUserStore((state) => state.user?.userId);

  const [socket, setSocket] = useState<Client | null>(null);

  useEffect(() => {
    const socketSetting = async () => {
      const client = new Client({
        brokerURL: `${process.env.EXPO_PUBLIC_API_URL}/ws-stomp`,
        connectHeaders: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
        onConnect: () => {
          console.log("Connected to STOMP server");

          client.subscribe(`/sub/user/${userId}`, (message) => {
            const parsedMessage: {
              type: keyof typeof user_noticeType;
              content: string;
            } = JSON.parse(message.body);

            console.log("Received message:", parsedMessage);

            switch (parsedMessage.type) {
              case user_noticeType.REPLY:
                console.log("Reply received:", parsedMessage.content);
                break;
              case user_noticeType.NESTED_REPLY:
                console.log("Nested reply received:", parsedMessage.content);
                break;
              case user_noticeType.TAG:
                console.log("Tag received:", parsedMessage.content);
                break;
            }
          });
        },
        onDisconnect: () => {
          console.log("Disconnected from STOMP server");
        },
        debug: (str) => {
          console.log(str);
        },
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
      });

      setSocket(client);
    };

    socketSetting();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.activate();
    }

    return () => {
      socket?.deactivate();
    };
  }, [socket]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
