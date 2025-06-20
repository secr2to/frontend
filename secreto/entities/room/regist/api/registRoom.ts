import { api } from "@/shared/kyInstance";
import { registRoomResponse } from "../type/type";

export const postRegistRoom = async (
  roomData: FormData
): Promise<registRoomResponse> => {
  try {
    const response = await api.post("rooms", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: roomData,
    });

    return response.json();
  } catch (error) {
    console.error("Error while room registration:", error);
    throw error;
  }
};
