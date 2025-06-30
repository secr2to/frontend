import Menu from "@/entities/main/mypage/component/menu";
import { Button, Profile, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { useGetMyInfo } from "@/entities/room/common/query/useGetMyInfo";
import { useEndGame } from "@/entities/room/modify/query/useEndGame";

export default function MyPage() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: user } = useGetMyInfo(roomId);
  const { mutate: endGame } = useEndGame();
  return (
    user && (
      <View className="flex-1 bg-default-background gap-10">
        <View className="flex-1">
          <View className="flex px-5 py-10 border-b border-inactive-background">
            <View className="px-5 flex flex-row items-center gap-4">
              <View>
                <Profile
                  size="medium"
                  imageUri={
                    user.useProfileYn ? user.profileUrl : user.roomCharacterUrl
                  }
                />
              </View>
              <View className="flex flex-col gap-1">
                <Typography
                  label={user.nickname}
                  style={TYPOGRAPHY_TYPE.MAIN_TITLE}
                />
                <Typography
                  label={user.searchId}
                  style={TYPOGRAPHY_TYPE.BODY_REGULAR}
                  color={COLOR.INACTIVE}
                />
              </View>
            </View>
          </View>
          <View className="flex px-5 py-10 border-b border-inactive-background gap-4">
            <Typography
              label="인게임 정보"
              style={TYPOGRAPHY_TYPE.SUB_REGULAR}
              color={COLOR.INACTIVE}
            />
            <View className="flex flex-col gap-4">
              <Menu label="닉네임" value={user.nickname} />
              <Menu
                label="자기소개"
                route={() => router.push(`/room/${roomId}/modify/`)}
              />
            </View>
          </View>
        </View>
        <View className="absolute flex w-full bottom-5 px-5 gap-4 self-center">
          {user.managerYn && (
            <Button
              label="마니또 종료하기"
              size="large"
              className="bg-error"
              onPress={() => endGame(roomId)}
            />
          )}
          <Button
            label="방에서 나가기"
            style="reverse"
            size="large"
            className="border-error"
            onPress={() => router.back()}
          />
        </View>
      </View>
    )
  );
}
