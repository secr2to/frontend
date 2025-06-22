import { useQuery } from "@tanstack/react-query";
import { getRoomInfo } from "../api/getRoomInfo";
import { getRoomInfoResponse, roomInfo } from "../type/type";

export const useGetRoomInfo = (roomId: string) => {
  return useQuery<
    getRoomInfoResponse,
    Error,
    roomInfo,
    [_1: string, _2: string]
  >({
    queryKey: ["getRoomInfo", roomId],
    queryFn: () => getRoomInfo(roomId),
    select: (data) => {
      return data.data;
    },
  });
};
