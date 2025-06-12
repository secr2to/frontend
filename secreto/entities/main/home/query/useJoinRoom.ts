import { useMutation } from "@tanstack/react-query";
import { joinRoomResponse } from "../type/type";
import { joinRoom } from "../api/joinRoom";
import { router } from "expo-router";

export const useJoinRoom = (code: string) => {
  return useMutation<joinRoomResponse, Error, void>({
    mutationFn: () => joinRoom(code),
    onSuccess: (data: joinRoomResponse) => {
      router.push(`/room/${data.data.roomId}`);
    },
  });
};
