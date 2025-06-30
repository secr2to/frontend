import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../api/getMyInfo";
import { getMyInfoResponse, myInfo } from "../type/type";

export const useGetMyInfo = (roomId: number) => {
  return useQuery<getMyInfoResponse, Error, myInfo, [_1: string, _2: number]>({
    queryKey: ["myInfo", roomId],
    queryFn: () => getMyInfo(roomId),
    enabled: !!roomId,
    select: (data) => {
      return data.data;
    },
  });
};
