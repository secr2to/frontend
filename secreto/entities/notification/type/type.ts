import { commonResponse } from "@/shared/type/type";

export type notificationPeriod = "TODAY" | "WEEK" | "ALL";

export type notification = {
  notificationId: number;
  author: string;
  content: string;
  generatedDate: Date;
  readYn: boolean;
  type: string;
};

export type notificationDetail = notification & {
  referenceId: number;
};

export type getNotificationDetailResponse = commonResponse<notificationDetail>;

export type getNotificationsResponse = commonResponse<{
  notificationList: notification[];
  hasNext: boolean;
  offset: number;
}>;
