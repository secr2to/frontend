import { api } from "@/shared/kyInstance";
import { getMyInfoResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getMyInfo = async (roomId: string): Promise<getMyInfoResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/my-info`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch My Info");
  }
};
