import { useMutation } from "@tanstack/react-query";
import { settingProfileResponse } from "../type/type";
import { router } from "expo-router";
import { settingProfile } from "../api/settingProfile";

export const useSettingProfile = (roomId: string) => {
  return useMutation<settingProfileResponse, Error, FormData>({
    mutationFn: (profileData) => settingProfile(roomId, profileData),
    onSuccess: () => {
      router.replace(`/(afterLogin)/room/${roomId}/(beforeStart)`);
    },
  });
};
