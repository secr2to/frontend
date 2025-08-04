import { api } from "@/shared/kyInstance";
import { getFeedsResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getFeeds = async (
  roomId: string,
  offset: number = 0
): Promise<getFeedsResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/feeds?offset=${offset}`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Feeds");
  }
};
