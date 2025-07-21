import { HttpError } from "@/shared/error";
import { api } from "@/shared/kyInstance";
import { getMembersInfoResponse } from "../type/type";

export const getRoomMembersInfo = async (
  roomId: string
): Promise<getMembersInfoResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/users`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Room Members Info");
  }
};
