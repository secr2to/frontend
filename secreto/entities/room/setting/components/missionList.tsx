import { Spacing, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { View } from "react-native";
import MissionCard from "./missionCard";
import { useGetMissions } from "../query/useGetMissions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";

interface MissionListProps {
  customMissions?: string[];
  selectedMissions: string[];
  setSelectedMissions: Dispatch<SetStateAction<string[]>>;
  isManager?: boolean;
  allMissionList: string[];
  setAllMissionList: Dispatch<SetStateAction<string[]>>;
  minimumMission: number;
}

export default function MissionList({
  customMissions = [],
  selectedMissions,
  setSelectedMissions,
  isManager = false,
  allMissionList,
  setAllMissionList,
  minimumMission,
}: MissionListProps) {
  const { data: systemMissions } = useGetMissions();

  useEffect(() => {
    const systemMissionsContent =
      systemMissions?.map((mission) => mission.content) || [];

    const uniqueMissions = Array.from(
      new Set([...systemMissionsContent, ...customMissions, ...allMissionList])
    );

    setAllMissionList(uniqueMissions);
  }, [systemMissions, customMissions, selectedMissions]);

  const onChecked = (mission: string) => {
    setSelectedMissions((prev) => {
      const newMissions = [...prev];
      if (!newMissions.includes(mission)) {
        newMissions.push(mission);
      }
      return newMissions;
    });
  };

  const onUnchecked = (mission: string) => {
    setSelectedMissions((prev) => {
      const newMissions = [...prev];
      const index = newMissions.indexOf(mission);
      if (index > -1) {
        newMissions.splice(index, 1);
      }
      return newMissions;
    });
  };

  return (
    <View className="flex-1 flex-col gap-4">
      <Typography
        label={`미션(${selectedMissions?.length})`}
        style={TYPOGRAPHY_TYPE.MAIN_TITLE}
      />
      {isManager && minimumMission - selectedMissions.length > 0 && (
        <Typography
          label={`설정하신 게임 일정과 미션 주기 기준 ${
            minimumMission - selectedMissions.length
          }개 미션을 추가로 선택하셔야 게임 시작이 가능합니다`}
          style={TYPOGRAPHY_TYPE.BODY_REGULAR}
        />
      )}
      {/* minimumMission */}
      <FlashList
        data={allMissionList}
        renderItem={({ item }) => (
          <MissionCard
            mission={item}
            onChecked={() => onChecked(item)}
            onUnchecked={() => onUnchecked(item)}
            checked={selectedMissions.includes(item)}
          />
        )}
        ItemSeparatorComponent={() => <Spacing size={8} />}
        ListEmptyComponent={
          <View>
            <Typography label="미션을 추가해 주세요" />
          </View>
        }
        estimatedItemSize={40}
      />
    </View>
  );
}
