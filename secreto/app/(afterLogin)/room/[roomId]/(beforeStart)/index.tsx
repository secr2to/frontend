import { useGetRoomInfo } from "@/entities/room/regist/query/useGetRoomInfo";
import MemberList from "@/entities/room/setting/components/memberList";
import Missions from "@/entities/room/setting/components/missions";
import RoomInfoList from "@/entities/room/setting/components/roomInfoList";
import StartGuide from "@/entities/room/setting/components/startGuide";
import { useGetMyRole } from "@/entities/room/setting/query/useGetMyRole";
import { Button, NavMenu, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { useGameStart } from "@/entities/room/setting/query/useGameStart";
import useUserStore from "@/shared/stores/useUserStore";
import { useGetRoomMembersInfo } from "@/entities/room/participants/query/useGetRoomMebersInfo";

export default function SettingRoom() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: roomInfo, isLoading } = useGetRoomInfo(roomId);
  const { data: isManager, isLoading: isManagerLoading } = useGetMyRole(roomId);
  const [allMissionList, setAllMissionList] = useState<string[]>([]);
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);
  const [step, setStep] = useState<string>("info");
  const { data: members } = useGetRoomMembersInfo(roomId);
  const user = useUserStore((state) => state.user);
  const { mutate: gameStart } = useGameStart();

  if (isLoading || isManagerLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={COLOR.PRIMARY}
        className="flex-1 items-center justify-center"
      />
    );
  }

  if (
    members?.some(
      (member) =>
        member.searchId === user?.searchId && member.standbyYn === true
    )
  ) {
    return (
      <View className="flex-1 items-center justify-center gap-10">
        <Image
          source={require("@/shared/images/default.png")}
          className="size-48 animate-pulse"
          resizeMode="contain"
        />
        <Typography
          label="입장 요청 중입니다, 방장의 승인을 기다려주세요."
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
      </View>
    );
  }

  const minimumDateToStart = () => {
    if (!roomInfo) return 1;

    const today = new Date();
    const endDate = new Date(roomInfo.endDate);
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const differenceInDays = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    return 1 + Math.floor(differenceInDays / Number(roomInfo.missionPeriod));
  };

  const acceptedMemberCount = () => {
    if (!members) return 0;
    return members.filter((member) => member.standbyYn === false).length;
  };

  const canGameStart = () => {
    if (!roomInfo) return false;
    return (
      selectedMissions.length >= minimumDateToStart() &&
      acceptedMemberCount() >= 3
    );
  };

  return (
    roomInfo && (
      <View className="flex-1 bg-default-background">
        <View className="flex flex-row w-full items-center justify-between px-5 py-2">
          <View>
            <Typography
              label={roomInfo.name}
              style={TYPOGRAPHY_TYPE.MAIN_TITLE}
            />
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
            {/* !TODO: 공유 기능 업데이트 예정 */}
            <Button label="공유" onPress={() => {}} />
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
        {step === "info" && !isManagerLoading && (
          <RoomInfoList isManager={isManager} roomInfo={roomInfo} />
        )}
        {step === "members" && !isManagerLoading && (
          <MemberList isManager={isManager} roomId={roomId} />
        )}
        {step === "mission" && !isManagerLoading && (
          <Missions
            minimumMission={roomInfo && minimumDateToStart()}
            isManager={isManager}
            allMissionList={allMissionList}
            setAllMissionList={setAllMissionList}
            selectedMissions={selectedMissions}
            setSelectedMissions={setSelectedMissions}
          />
        )}
        {step === "info" && !isManagerLoading && (
          <View className="absolute bottom-10 px-5 flex w-full self-center gap-2">
            <StartGuide isManager={isManager} />
            {isManager && (
              <Button
                label="게임 시작"
                size="medium"
                disabled={!canGameStart()}
                onPress={() =>
                  gameStart({ roomId, missionList: selectedMissions })
                }
              />
            )}
            {isManager && !canGameStart() && (
              <View className="flex items-center justify-center">
                <Typography
                  label={
                    "게임 시작에 필요한 인원 수 혹은 미션의 개수가 부족합니다."
                  }
                  color={COLOR.ERROR}
                />
              </View>
            )}
          </View>
        )}
      </View>
    )
  );
}
