import { useQuery } from "@tanstack/react-query";
import { getMyRoleResponse } from "../type/type";
import { getMyRole } from "../api/myRole";

export const useGetMyRole = (roomId: string) => {
  return useQuery<getMyRoleResponse, Error, boolean, [_1: string, _2: string]>({
    queryKey: ["getMyRole", roomId],
    queryFn: () => getMyRole(roomId),
    select: (data) => {
      return data.data.isManagerYn;
    },
  });
};
