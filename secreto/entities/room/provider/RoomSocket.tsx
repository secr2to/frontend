import useUserStore from "@/shared/stores/useUserStore";
import { room_noticeType } from "@/shared/type/noticeType";
import { SocketContext } from "@/shared/websocket/provider/globalSocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { Slot, useLocalSearchParams } from "expo-router";
import { useContext, useEffect } from "react";

export default function RoomSocket({
  children,
}: {
  children: React.ReactNode;
}) {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (!socket) return;
    socket.subscribe(`/sub/room/${roomId}`, (message) => {
      const parsedMessage: {
        type: keyof typeof room_noticeType;
        content: string;
      } = JSON.parse(message.body);

      console.log(
        "Received message:",
        parsedMessage,
        parsedMessage.type,
        roomId,
        user?.email
      );

      switch (parsedMessage.type) {
        case room_noticeType.USER_ACCEPT:
        case room_noticeType.USER_REJECT:
          queryClient.refetchQueries({
            queryKey: ["getRoomMembersInfo", roomId],
          });
          break;
        case room_noticeType.INGAME_INTRODUCTION:
        case room_noticeType.INGAME_PROFILE_IMAGE:
        case room_noticeType.INGAME_PROFILE_INFO:
          queryClient.refetchQueries({
            queryKey: ["getRoomMembersInfo", roomId],
          });

          queryClient.refetchQueries({
            queryKey: ["getRoomMembersProfile", roomId],
          });
          break;

        case room_noticeType.ROOM_START:
        case room_noticeType.ROOM_IMAGE:
        case room_noticeType.ROOM_INFORMATION:
        case room_noticeType.ROOM_END:
          // 데이터 변경 지연으로 인한 3초 후에 방 정보 쿼리 재요청,
          // 백엔드 수정 시 변경
          setTimeout(() => {
            queryClient.refetchQueries({
              queryKey: ["getRoomInfo", roomId],
            });
          }, 3000);
          break;

        case room_noticeType.MISSION:
          queryClient.invalidateQueries({
            queryKey: ["getMissions", roomId, true],
          });
          queryClient.invalidateQueries({
            queryKey: ["getMissions", roomId, undefined],
          });
          break;

        default:
          console.warn("Unknown message type:", parsedMessage.type);
      }
    });
    return () => {
      socket.unsubscribe(`/sub/room/${roomId}`);
    };
  }, [socket]);
  return <>{children}</>;
}
