import { useQuery } from "@tanstack/react-query";
import { getChatRooms } from "../api/getChatRooms";
import { chatRoomsResponse, chatRoomsResponseData } from "../type/type";

export const useGetChatRooms = (roomId: string) => {
  return useQuery<
    chatRoomsResponse,
    Error,
    chatRoomsResponseData[],
    [_1: string, _2: string]
  >({
    queryKey: ["chatRooms", roomId],
    queryFn: () => getChatRooms(roomId),
    select: (data) => {
      return data.data;
    },
  });
};
