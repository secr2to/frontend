import { api } from "@/shared/kyInstance";
import { getRoomsResponse, roomStatus } from "../type/type";

export const getRooms = async (
  status: roomStatus
): Promise<getRoomsResponse> => {
  const response = await api.get(`rooms?status=${status}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Rooms");
  }
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched successfully");
    }, 3000);
  });

  return response.json();
};
