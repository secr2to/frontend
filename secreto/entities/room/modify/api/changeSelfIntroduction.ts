import { api } from "@/shared/kyInstance";
import { changeSelfIntroductionResponse } from "../type/type";

export const changeSelfIntroduction = async (
  roomId: string,
  roomUserId: number,
  selfIntroduction: string
): Promise<changeSelfIntroductionResponse> => {
  try {
    const response = await api.put(`rooms/${roomId}/profile/${roomUserId}`, {
      json: {
        selfIntroduction,
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error while changeSelfIntroduction", error);
    throw error;
  }
};
