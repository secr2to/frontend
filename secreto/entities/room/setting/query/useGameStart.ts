import { useMutation } from "@tanstack/react-query";
import { gameStart } from "../api/gameStart";
import { router } from "expo-router";
import { gameStartResponse } from "../type/type";

export const useGameStart = () => {
  return useMutation<
    gameStartResponse,
    Error,
    { roomId: string; missionList: string[] }
  >({
    mutationFn: ({ roomId, missionList }) => gameStart(roomId, missionList),
    onSuccess: (response) => {
      router.replace(
        `/(afterLogin)/room/${response.data.roomId}/(afterStart)/feed`
      );
    },
  });
};
