import { api } from "@/shared/kyInstance";
import { changeSearchIdResponse } from "../type/type";

export const changeSearchId = async (
  newSearchId: string
): Promise<changeSearchIdResponse> => {
  try {
    const response = await api.patch(`users/search-id`, {
      json: {
        searchId: newSearchId,
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error while change user:", error);
    throw error;
  }
};
