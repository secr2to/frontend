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
}

export default function MissionList({
  customMissions = [],
  selectedMissions,
  setSelectedMissions,
}: MissionListProps) {
  const { data: systemMissions } = useGetMissions();
  const [missions, setAllMissions] = useState<string[]>([]);

  useEffect(() => {
    const systemMissionsContent =
      systemMissions?.map((mission) => mission.content) || [];

    const uniqueMissions = Array.from(
      new Set([...systemMissionsContent, ...customMissions])
    );

    setAllMissions(uniqueMissions);
  }, [systemMissions, customMissions]);

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
      <FlashList
        data={missions}
        renderItem={({ item }) => (
          <MissionCard
            mission={item}
            onChecked={() => onChecked(item)}
            onUnchecked={() => onUnchecked(item)}
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
