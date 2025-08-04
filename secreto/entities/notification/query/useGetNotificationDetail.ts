import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getNotificationDetailResponse,
  notificationDetail,
} from "../type/type";
import { getNotificationDetail } from "../api/getNotificationDetail";

export const useGetNotificationDetail = (notificationId: number) => {
  return useSuspenseQuery<
    getNotificationDetailResponse,
    Error,
    notificationDetail,
    [_1: string, _2: number]
  >({
    queryKey: ["getNotificationDetail", notificationId],
    queryFn: () => getNotificationDetail(notificationId),
    select: (data) => {
      return data.data;
    },
  });
};
