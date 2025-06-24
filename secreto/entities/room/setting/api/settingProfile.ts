import { api } from "@/shared/kyInstance";
import { settingProfileResponse } from "../type/type";

export const settingProfile = async (
  roomId: string,
  profileData: FormData
): Promise<settingProfileResponse> => {
  try {
    const response = await api.post(`rooms/${roomId}/profile`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: profileData,
    });

    return response.json();
  } catch (error) {
    console.error("Error while Setting Profile:", error);
    throw error;
  }
};
