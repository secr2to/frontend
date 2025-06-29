import { useMutation } from "@tanstack/react-query";
import { changeSearchIdResponse } from "../type/type";
import { changeSearchId } from "../api/changeSearchId";
import { router } from "expo-router";
import useUserStore from "@/shared/stores/useUserStore";

export const useChangeSearchId = () => {
  return useMutation<changeSearchIdResponse, Error, string>({
    mutationFn: (searchId) => changeSearchId(searchId),
    onSuccess: (_, searchId) => {
      useUserStore.getState().updateUser({
        searchId: searchId,
      });
      router.back();
    },
  });
};
