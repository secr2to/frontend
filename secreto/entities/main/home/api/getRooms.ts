import { api } from "@/shared/kyInstance";
import { getRoomsResponse, roomStatus } from "../type/type";
import { HttpError } from "@/shared/error";

export const getRooms = async (
  status: roomStatus
): Promise<getRoomsResponse> => {
  try {
    const response = await api.get(`rooms?status=${status}`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Rooms");
  }
};
