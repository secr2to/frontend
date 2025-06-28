import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getMissionsResponse, ingameMission } from "../type/type";
import { getGameMissions } from "../api/getGameMissions";

export const useGetGameMissions = (roomId: string, executeYn?: boolean) => {
  return useSuspenseQuery<
    getMissionsResponse,
    Error,
    ingameMission[],
    [_1: string, _2: string, _3?: boolean]
  >({
    queryKey: ["getMissions", roomId, executeYn],
    queryFn: () => getGameMissions(roomId, executeYn),
    select: (data) => {
      return data.data;
    },
  });
};
