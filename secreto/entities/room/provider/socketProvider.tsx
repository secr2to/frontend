import { getAccessToken } from "@/shared/stores/storage";
import { Client } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";

export const SocketContext = createContext<Client | null>(null);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = async () => {
    const token = await getAccessToken();
    return token;
  };
  const [socket, setSocket] = useState<Client | null>(null);

  useEffect(() => {
    const socketSetting = async () => {
      const client = new Client({
        brokerURL: `${process.env.EXPO_PUBLIC_API_URL}/ws-stomp`,
        connectHeaders: {
          Authorization: `Bearer ${await accessToken()}`,
        },
        onConnect: () => {
          console.log("Connected to STOMP server");
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
