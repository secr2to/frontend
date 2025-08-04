import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getNotificationsResponse, notification } from "../type/type";
import { getNotifications } from "../api/getNotifications";

export const useGetNotifications = (
  period: "TODAY" | "WEEK" | "ALL",
  size: number = 5
) => {
  return useSuspenseInfiniteQuery<
    getNotificationsResponse,
    Error,
    notification[],
    [_1: string, _2: string],
    number
  >({
    queryKey: ["getNotifications", period],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getNotifications(period, pageParam, size),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext
        ? Math.floor(lastPage.data.offset / size) + 1
        : undefined,
    select: (data) => {
      return data.pages.flatMap((page) => page.data.notificationList);
    },
  });
};
