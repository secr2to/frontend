import { api } from "@/shared/kyInstance";
import { gameStartResponse, getMyRoleResponse } from "../type/type";

export const gameStart = async (
  roomId: string,
  missionList: string[]
): Promise<gameStartResponse> => {
  try {
    const response = await api.put(`rooms/${roomId}/start`, {
      json: {
        missionList,
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error while starting the game:", error);
    throw error;
  }
};
