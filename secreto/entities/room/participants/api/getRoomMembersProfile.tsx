import { HttpError } from "@/shared/error";
import { api } from "@/shared/kyInstance";
import { getMembersProfileResponse } from "../type/type";

export const getRoomMembersProfile = async (
  roomId: string
): Promise<getMembersProfileResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/profile`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Room Members Profile");
  }
};
