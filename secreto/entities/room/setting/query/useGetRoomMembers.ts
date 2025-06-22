import { useQuery } from "@tanstack/react-query";
import { getRoomMembers } from "../api/manageMember";
import { getMembersResponse, roomMember } from "../type/type";

export const useGetRoomMembers = (roomId: string) => {
  return useQuery<
    getMembersResponse,
    Error,
    roomMember[],
    [_1: string, _2: string]
  >({
    queryKey: ["getRoomMembers", roomId],
    queryFn: () => getRoomMembers(roomId),
    select: (data) => {
      return data.data;
    },
    refetchInterval: 10000,
  });
};
