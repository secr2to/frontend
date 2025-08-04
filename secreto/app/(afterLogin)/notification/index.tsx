import NotificationList from "@/entities/notification/component/notificationList";
import NotificationListFallback from "@/entities/notification/component/notificationListFallback";
import { badgeMenu } from "@/entities/notification/data/badgeData";
import { notificationPeriod } from "@/entities/notification/type/type";
import { BadgeMenu, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Suspense, useState } from "react";
import { Pressable, View } from "react-native";

export default function Page() {
  const [state, setState] = useState(badgeMenu[0].state);

  return (
    <View className="flex-1 bg-default-background">
      <View className="flex-1 py-4">
        <View className="flex px-5 w-full flex-row items-center justify-between">
          <BadgeMenu items={badgeMenu} state={state} setState={setState} />
          <Pressable>
            <Typography label="모두 읽음" />
          </Pressable>
        </View>
        {/* !TODO: state에 따른 Suspense 기반 알림 리스트 구현 */}
        <Suspense fallback={<NotificationListFallback />}>
          <NotificationList period={state as notificationPeriod} />
        </Suspense>
        <View className="flex items-center justify-center p-2">
          <Typography
            label="최근 30일 이내 알림만 표시 됩니다."
            color={COLOR.INACTIVE}
            style={TYPOGRAPHY_TYPE.BODY_BOLD}
          />
        </View>
      </View>
    </View>
  );
}
