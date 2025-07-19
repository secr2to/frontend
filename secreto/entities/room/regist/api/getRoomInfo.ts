import { api } from "@/shared/kyInstance";
import { getRoomInfoResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getRoomInfo = async (
  roomId: string
): Promise<getRoomInfoResponse> => {
  try {
    const reponse = await api.get(`rooms/${roomId}`);

    return reponse.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Room Info");
  }
};
