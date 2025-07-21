import { useSuspenseQuery } from "@tanstack/react-query";
import { getRoomMembersInfo } from "../api/getRoomMembersInfo";
import { getMembersInfoResponse, roomMemberInfo } from "../type/type";

export const useGetRoomMembersInfo = (roomId: string) => {
  return useSuspenseQuery<
    getMembersInfoResponse,
    Error,
    roomMemberInfo[],
    [_1: string, _2: string]
  >({
    queryKey: ["getRoomMembersInfo", roomId],
    queryFn: () => getRoomMembersInfo(roomId),
    select: (data) => {
      return data.data;
    },
  });
};
