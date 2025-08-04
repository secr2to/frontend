import { useSuspenseQuery } from "@tanstack/react-query";
import { getRoomsResponse, roomsInfo, roomStatus } from "../type/type";
import { getRooms } from "../api/getRooms";

export const useGetRooms = (status: roomStatus) => {
  return useSuspenseQuery<
    getRoomsResponse,
    Error,
    roomsInfo[],
    [_1: string, _2: roomStatus]
  >({
    queryKey: ["getRooms", status],
    queryFn: () => getRooms(status),
    select: (data) => {
      return data.data;
    },
  });
};
