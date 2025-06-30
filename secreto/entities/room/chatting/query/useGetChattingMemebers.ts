import { useQuery } from "@tanstack/react-query";
import { chattingMembersInfo, chattingMemebersResponse } from "../type/type";
import { getChattingMemebers } from "../api/getChattingMemeber";

export const useGetChattingMembers = (roomId: string) => {
  return useQuery<
    chattingMemebersResponse,
    Error,
    chattingMembersInfo[],
    [_1: string, _2: string]
  >({
    queryKey: ["chattingMembers", roomId],
    queryFn: () => getChattingMemebers(roomId),
    select: (data) => {
      return data.data;
    },
  });
};
