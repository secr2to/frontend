import { useGetNotifications } from "@/entities/notification/query/useGetNotifications";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";

export default function NoticeCount() {
  const { data: notificationList } = useGetNotifications("ALL", 100);
  const [notReadNotice, setNotReadNotice] = useState<number>(0);
  const [noticeLabel, setNoticeLabel] = useState<string>("");

  useEffect(() => {
    if (notificationList) {
      setNotReadNotice(
        notificationList.filter((notice) => !notice.readYn).length
      );
    }
  }, [notificationList]);

  useEffect(() => {
    if (notReadNotice === 0) {
      setNoticeLabel("");
    } else if (notReadNotice < 100) {
      setNoticeLabel(notReadNotice.toString());
    } else {
      setNoticeLabel("99+");
    }
  }, [notReadNotice]);

  return (
    <>
      {noticeLabel && (
        <View className="absolute flex items-center justify-center size-6 inset-0 left-[30px] bg-error rounded-full">
          <Typography
            label={noticeLabel}
            style={TYPOGRAPHY_TYPE.LABEL_BOLD}
            color={COLOR.WHITE}
          />
        </View>
      )}
    </>
  );
}
