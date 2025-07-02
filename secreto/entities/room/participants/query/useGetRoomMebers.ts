import { useSuspenseQuery } from "@tanstack/react-query";
import { getMembersResponse, roomMember } from "../../setting/type/type";
import { getRoomMembers } from "../../setting/api/manageMember";

export const useSuspenseGetRoomMembers = (roomId: string) => {
  return useSuspenseQuery<
    getMembersResponse,
    Error,
    roomMember[],
    [_1: string, _2: string]
  >({
    queryKey: ["getRoomMembersSuspense", roomId],
    queryFn: () => getRoomMembers(roomId),
    select: (data) => {
      return data.data;
    },
    refetchInterval: 10000,
  });
};
