import { api } from "@/shared/kyInstance";
import { getMissionsResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getGameMissions = async (
  roomId: string,
  executeYn?: boolean
): Promise<getMissionsResponse> => {
  const queryParam = executeYn !== undefined ? `?executeYn=${executeYn}` : "";
  try {
    const response = await api.get(`rooms/${roomId}/missions${queryParam}`);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data fetched successfully");
      }, 3000);
    });

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Game Missions");
  }
};
