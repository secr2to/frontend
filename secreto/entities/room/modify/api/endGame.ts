import { api } from "@/shared/kyInstance";
import { endGameResponse } from "../type/type";

export const endGame = async (roomId: string): Promise<endGameResponse> => {
  try {
    const response = await api.put(`rooms/${roomId}/end`);

    return response.json();
  } catch (error) {
    console.error("Error while changeSelfIntroduction", error);
    throw error;
  }
};
