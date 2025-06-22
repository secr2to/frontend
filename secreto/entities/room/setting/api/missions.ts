import { api } from "@/shared/kyInstance";
import { getMissionsResponse } from "../type/type";

export const getMissions = async (): Promise<getMissionsResponse> => {
  try {
    const response = await api.get("missions");
    return response.json();
  } catch (error) {
    console.error("Error fetching missions:", error);
    throw error;
  }
};
