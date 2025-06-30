import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../api/getMyInfo";
import { getMyInfoResponse, myInfo } from "../type/type";

export const useGetMyInfo = (roomId: string) => {
  return useQuery<getMyInfoResponse, Error, myInfo, [_1: string, _2: string]>({
    queryKey: ["myInfo", roomId],
    queryFn: () => getMyInfo(roomId),
    enabled: !!roomId,
    select: (data) => {
      return data.data;
    },
  });
};
