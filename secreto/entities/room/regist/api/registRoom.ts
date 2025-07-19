import { api } from "@/shared/kyInstance";
import { registRoomResponse } from "../type/type";
import { HttpError } from "@/shared/error";

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
    throw new HttpError("Network error while registering room");
  }
};
