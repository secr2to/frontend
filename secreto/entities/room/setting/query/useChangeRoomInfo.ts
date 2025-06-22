import { useMutation } from "@tanstack/react-query";
import { changeRoomInfo } from "../api/settingRoom";
import { changeRoomResponse } from "../type/type";
import { router } from "expo-router";

export const useChangeRoomInfo = () => {
  return useMutation<
    changeRoomResponse,
    Error,
    { roomId: string; endDate: string; missionPeriod: string }
  >({
    mutationFn: ({ roomId, endDate, missionPeriod }) =>
      changeRoomInfo(roomId, endDate, missionPeriod),
    onSuccess: (response) => {
      router.replace(
        `/(afterLogin)/room/${response.data.roomId}/(beforeStart)`
      );
    },
  });
};
