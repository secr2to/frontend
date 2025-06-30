import { useMutation } from "@tanstack/react-query";
import { changeSelfIntroductionResponse } from "../type/type";
import { changeSelfIntroduction } from "../api/changeSelfIntroduction";
import { router } from "expo-router";

export const useChangeSelfIntroduction = () => {
  return useMutation<
    changeSelfIntroductionResponse,
    Error,
    { roomId: string; roomUserId: number; selfIntroduction: string }
  >({
    mutationFn: ({ roomId, roomUserId, selfIntroduction }) =>
      changeSelfIntroduction(roomId, roomUserId, selfIntroduction),
    onSuccess: () => {
      router.back();
    },
  });
};
