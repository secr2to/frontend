import { useMutation } from "@tanstack/react-query";
import { registRoomResponse } from "../type/type";
import { postRegistRoom } from "../api/registRoom";
import { router } from "expo-router";

export const useRegistRoom = () => {
  return useMutation<registRoomResponse, Error, FormData>({
    mutationFn: (roomData) => postRegistRoom(roomData),
    onSuccess: (response) => {
      router.replace(
        `/(afterLogin)/room/${response.data.roomId}/(beforeStart)`
      );
    },
  });
};
