import { useSuspenseQuery } from "@tanstack/react-query";
import { getRoomsResponse, roomsInfo, roomStatus } from "../type/type";
import { getRooms } from "../api/getRooms";

export const useGetRooms = (
  status: "ALL" | "WAITING" | "PROGRESS" | "TERMINATED"
) => {
  return useSuspenseQuery<getRoomsResponse, Error, roomsInfo[], [_1: string]>({
    queryKey: ["getRooms"],
    queryFn: () => getRooms(),
    select: (data) => {
      if (status !== "ALL") {
        return data.data.filter((room) => room.status === status);
      }
      return data.data;
    },
  });
};
