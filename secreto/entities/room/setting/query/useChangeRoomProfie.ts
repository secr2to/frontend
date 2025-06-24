import { useMutation } from "@tanstack/react-query";
import { changeRoomImage } from "../api/settingRoom";
import { changeRoomResponse } from "../type/type";
import { router } from "expo-router";

export const useChangeRoomProfile = () => {
  return useMutation<
    changeRoomResponse,
    Error,
    { roomId: string; image: File }
  >({
    mutationFn: ({ roomId, image }) => changeRoomImage(roomId, image),
    onSuccess: () => {
      router.back();
    },
  });
};
