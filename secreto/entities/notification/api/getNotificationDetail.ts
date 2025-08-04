import { api } from "@/shared/kyInstance";
import { HttpError } from "@/shared/error";
import { getNotificationDetailResponse } from "../type/type";

export const getNotificationDetail = async (
  notificationId: number
): Promise<getNotificationDetailResponse> => {
  try {
    const response = await api.get(`notifications/${notificationId}`);

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Notifications");
  }
};
