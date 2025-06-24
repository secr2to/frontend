import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo, getUserToken, logout } from "./api";
import {
  getTokenResponse,
  getUserLogoutResponse,
  getUserResponse,
  serviceToken,
  userInfo,
} from "./type";
import useUserStore from "@/shared/stores/useUserStore";

export const useGetToken = (tempId: string) => {
  return useQuery<getTokenResponse, Error, serviceToken, [_1: string]>({
    queryKey: ["userToken"],
    queryFn: () => getUserToken(tempId),
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
  });
};

export const useGetUser = () => {
  return useQuery<getUserResponse, Error, userInfo, [_1: string]>({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
    enabled: false,
    select: (data) => {
      return data.data;
    },
  });
};

export const useUserLogout = () => {
  return useMutation<getUserLogoutResponse, Error, void>({
    mutationFn: () => logout(),
    onSuccess: () => {
      useUserStore.getState().logout();
    },
  });
};
