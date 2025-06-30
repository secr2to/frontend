import { useMutation } from "@tanstack/react-query";
import { deleteRoomResponse } from "../type/type";
import { router } from "expo-router";
import { deleteRoom } from "../api/deleteRoom";

export const useDeleteRoom = () => {
  return useMutation<deleteRoomResponse, Error, string>({
    mutationFn: (roomId) => deleteRoom(roomId),
    onSuccess: () => {
      router.back();
    },
  });
};
