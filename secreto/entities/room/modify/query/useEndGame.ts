import { useMutation } from "@tanstack/react-query";
import { endGameResponse } from "../type/type";
import { router } from "expo-router";
import { endGame } from "../api/endGame";

export const useEndGame = () => {
  return useMutation<endGameResponse, Error, string>({
    mutationFn: (roomId) => endGame(roomId),
    onSuccess: () => {
      router.back();
    },
  });
};
