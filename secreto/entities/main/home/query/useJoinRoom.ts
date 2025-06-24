import { useMutation } from "@tanstack/react-query";
import { joinRoomResponse } from "../type/type";
import { joinRoom } from "../api/joinRoom";
import { router } from "expo-router";

export const useJoinRoom = () => {
  return useMutation<joinRoomResponse, Error, string>({
    mutationFn: (code: string) => joinRoom(code),
    onSuccess: (data: joinRoomResponse) => {
      router.push(`/room/${data.data.roomId}/waiting`);
    },
  });
};
