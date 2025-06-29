import Menu from "@/entities/main/mypage/component/menu";
import { useUserLogout } from "@/entities/users/query";
import { Button, Profile, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import useUserStore from "@/shared/stores/useUserStore";
import { router } from "expo-router";
import { View } from "react-native";
import app from "@/app.json";

export default function MyPage() {
  const user = useUserStore((state) => state.user);
  const { expo } = app;
  const { mutate: logout } = useUserLogout();

  return (
    user && (
      <View className="flex-1 bg-default-background gap-10">
        <View className="flex-1">
          <View className="flex px-5 py-10 border-b border-inactive-background">
            <View className="px-5 flex flex-row items-center gap-4">
              <View>
                <Profile size="medium" imageUri={user.profileUrl} />
              </View>
              <View className="flex flex-col gap-1">
                <Typography
                  label={user.searchId}
                  style={TYPOGRAPHY_TYPE.MAIN_TITLE}
                />
                <Typography label={user.email} color={COLOR.INACTIVE} />
              </View>
            </View>
          </View>
          <View className="flex px-5 py-10 border-b border-inactive-background gap-4">
            <Typography
              label="일반"
              style={TYPOGRAPHY_TYPE.SUB_REGULAR}
              color={COLOR.INACTIVE}
            />
            <View className="flex flex-col gap-4">
              <Menu
                label="검색 ID"
                value={user.searchId}
                route={() => router.push("/(afterLogin)/manage/searchId")}
              />
              <Menu label="화면 테마 설정" value="추가 예정" />
            </View>
          </View>
          <View className="flex px-5 py-10 border-b border-inactive-background gap-4">
            <Typography
              label="도움말"
              style={TYPOGRAPHY_TYPE.SUB_REGULAR}
              color={COLOR.INACTIVE}
            />
            <View className="flex flex-col gap-4">
              <Menu
                label="고객 센터"
                route={() => router.push("/(afterLogin)/manage/customer")}
              />
              <Menu label="앱 버전" value={expo.version} />
            </View>
          </View>
        </View>
        <View className="absolute flex w-full bottom-5 px-5 self-center">
          <Button
            label="로그아웃"
            style="reverse"
            size="large"
            onPress={logout}
          />
        </View>
      </View>
    )
  );
}
