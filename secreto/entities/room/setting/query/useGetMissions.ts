import { useQuery } from "@tanstack/react-query";
import { getMissionsResponse, systemMission } from "../type/type";
import { getMissions } from "../api/missions";

export const useGetMissions = () => {
  return useQuery<getMissionsResponse, Error, systemMission[], [_1: string]>({
    queryKey: ["getMissions"],
    queryFn: () => getMissions(),
    select: (data) => {
      return data.data;
    },
  });
};
