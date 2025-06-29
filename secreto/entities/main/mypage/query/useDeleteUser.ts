import { useMutation } from "@tanstack/react-query";
import { deleteUserResponse } from "../type/type";
import { router } from "expo-router";
import useUserStore from "@/shared/stores/useUserStore";
import { deleteUser } from "../api/deleteUser";

export const useDeleteUser = () => {
  return useMutation<deleteUserResponse, Error, number>({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      useUserStore.getState().logout();
      router.replace("/(beforeLogin)/goodbye");
    },
  });
};
