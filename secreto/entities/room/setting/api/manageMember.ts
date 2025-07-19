import { api } from "@/shared/kyInstance";
import { changeMemberResponse, getMembersResponse } from "../type/type";
import { HttpError } from "@/shared/error";

export const getRoomMembers = async (
  roomId: string
): Promise<getMembersResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/users`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Room Members");
  }
};

export const accepMember = async (
  roomId: string,
  roomUsers: number[]
): Promise<changeMemberResponse> => {
  try {
    const response = await api.put(`rooms/${roomId}/accept`, {
      json: {
        roomUserIds: roomUsers,
      },
    });

    return response.json();
  } catch (error) {
    throw new HttpError("Failed to accept member");
  }
};

export const denyMember = async (
  roomId: string,
  roomUsers: number[]
): Promise<changeMemberResponse> => {
  try {
    const response = await api.put(`rooms/${roomId}/deny`, {
      json: {
        roomUserIds: roomUsers,
      },
    });

    return response.json();
  } catch (error) {
    throw new HttpError("Failed to deny member");
  }
};
