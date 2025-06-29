import { api } from "@/shared/kyInstance";
import { getMissionsResponse } from "../type/type";

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
    console.error("Error fetching missions:", error);
    throw error;
  }
};
