import { useSuspenseQuery } from "@tanstack/react-query";
import { getMembersProfileResponse, roomMemberProfile } from "../type/type";
import { getRoomMembersProfile } from "../api/getRoomMembersProfile";

export const useGetRoomMembersProfile = (roomId: string) => {
  return useSuspenseQuery<
    getMembersProfileResponse,
    Error,
    roomMemberProfile[],
    [_1: string, _2: string]
  >({
    queryKey: ["getRoomMembersProfile", roomId],
    queryFn: () => getRoomMembersProfile(roomId),
    select: (data) => {
      return data.data;
    },
    gcTime: 1000 * 60 * 60 * 2,
    staleTime: 1000 * 60 * 60 * 2,
  });
};
