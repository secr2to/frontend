import { useGetRoomInfo } from "@/entities/room/regist/query/useGetRoomInfo";
import MemberList from "@/entities/room/setting/components/memberList";
import Missions from "@/entities/room/setting/components/missions";
import RoomInfoList from "@/entities/room/setting/components/roomInfoList";
import StartGuide from "@/entities/room/setting/components/startGuide";
import { Button, NavMenu, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, View } from "react-native";

export default function SettingRoom() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: roomInfo, isLoading } = useGetRoomInfo(roomId as string);
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);
  const [step, setStep] = useState<string>("info");

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={COLOR.PRIMARY}
        className="flex-1 items-center justify-center"
      />
    );
  }

  if (!roomInfo || (roomInfo && roomInfo?.status !== "WAITING")) {
    router.replace(`/(afterLogin)/room/${roomId}/(afterStart)/feed`);
  }

  return (
    roomInfo && (
      <View className="flex-1 bg-default-background">
        <View className="flex flex-row w-full items-center justify-between px-5 py-2">
          <View>
            <Typography label="EMELMUJIRO" style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
          </View>
          <View className="flex flex-row items-center justify-end gap-2 py-2">
            <View className="flex flex-col items-end gap-[2px]">
              <Typography
                label="초대코드"
                style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
                color={COLOR.INACTIVE}
              />
              <Typography
                label={roomInfo?.code}
                style={TYPOGRAPHY_TYPE.BODY_BOLD}
                color={COLOR.PRIMARY}
              />
            </View>
            {/* !TODO: 방 공유 관련 기능 구현 예정 */}
            <Button label="공유" onPress={() => alert("공유 로직")} />
          </View>
        </View>
        <NavMenu
          items={[
            {
              label: "방 정보",
              state: "info",
            },
            {
              label: "인원",
              state: "members",
            },
            {
              label: "미션",
              state: "mission",
            },
          ]}
          state={step}
          setState={setStep}
        />
        {step === "info" && <RoomInfoList roomInfo={roomInfo} />}
        {step === "members" && <MemberList roomId={roomId} />}
        {step === "mission" && (
          <Missions
            selectedMissions={selectedMissions}
            setSelectedMissions={setSelectedMissions}
          />
        )}
        {step === "info" && (
          <View className="absolute bottom-10 px-5 flex w-full self-center">
            <StartGuide />
            <Button label="게임 시작" size="medium" />
          </View>
        )}
      </View>
    )
  );
}
