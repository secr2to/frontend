import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameStart } from "../api/gameStart";
import { router } from "expo-router";
import { gameStartResponse } from "../type/type";

export const useGameStart = () => {
  const queryClient = useQueryClient();
  return useMutation<
    gameStartResponse,
    Error,
    { roomId: string; missionList: string[] }
  >({
    mutationFn: ({ roomId, missionList }) => gameStart(roomId, missionList),
    onSuccess: (response, variables) => {
      queryClient.refetchQueries({
        queryKey: ["getRoomInfo", variables.roomId],
      });
    },
  });
};
