import { api } from "@/shared/kyInstance";
import { changeMemberResponse, getMembersResponse } from "../type/type";

export const getRoomMembers = async (
  roomId: string
): Promise<getMembersResponse> => {
  try {
    const response = await api.get(`rooms/${roomId}/users`);

    return response.json();
  } catch (error) {
    console.error("Error while accepting member:", error);
    throw error;
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
    console.error("Error while accepting member:", error);
    throw error;
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
    console.error("Error while denying member:", error);
    throw error;
  }
};
