import { api } from "@/shared/kyInstance";
import { changeRoomResponse } from "../type/type";

export const changeRoomImage = async (
  roomId: string,
  image: File
): Promise<changeRoomResponse> => {
  try {
    const response = api.put(`rooms/${roomId}/images`, {
      json: {
        roomImage: image,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error while changing room image:", error);
    throw error;
  }
};

export const changeRoomInfo = async (
  roomId: string,
  endDate: string,
  missionPeriod: string
): Promise<changeRoomResponse> => {
  try {
    const response = await api.put(`rooms/${roomId}/details`, {
      json: {
        endDate: endDate,
        missionPeriod: missionPeriod,
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error while changing room info:", error);
    throw error;
  }
};
