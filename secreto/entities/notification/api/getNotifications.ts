import { api } from "@/shared/kyInstance";
import { HttpError } from "@/shared/error";
import { getNotificationsResponse } from "../type/type";

export const getNotifications = async (
  period: "TODAY" | "WEEK" | "ALL",
  page: number = 0,
  size: number = 5
): Promise<getNotificationsResponse> => {
  try {
    const response = await api.get(
      `notifications?period=${period}&page=${page}&size=${size}`
    );

    return response.json();
  } catch (error) {
    throw new HttpError("Network Failed to fetch Notifications");
  }
};
