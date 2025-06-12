import { api } from "@/shared/kyInstance";
import { joinRoomResponse } from "../type/type";

export const joinRoom = async (
  invitaitionCode: string
): Promise<joinRoomResponse> => {
  try {
    const response = await api.post(`rooms/code`, {
      json: { code: invitaitionCode },
    });

    return response.json();
  } catch (error) {
    throw new Error("Failed to join room");
  }
};
