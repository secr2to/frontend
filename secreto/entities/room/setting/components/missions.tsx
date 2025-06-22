import { View } from "react-native";
import MissionList from "./missionList";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Inputbox } from "@/shared/components";

interface MissionListProps {
  selectedMissions: string[];
  setSelectedMissions: Dispatch<SetStateAction<string[]>>;
}

export default function Missions({
  setSelectedMissions,
  selectedMissions,
}: MissionListProps) {
  const [mission, setMission] = useState<string>("");
  const [customMissions, setCustomMissions] = useState<string[]>([]);

  const addCustomMission = () => {
    if (mission.trim() === "") {
      alert("미션을 입력해주세요.");
      return;
    }
    setCustomMissions((prev) => [...prev, mission]);
    setMission("");
  };

  return (
    <View className="flex-1 flex-col gap-2 px-10 py-5">
      <View className="flex flex-row w-full gap-2 items-center">
        <View className="flex w-[80%]">
          <Inputbox
            value={mission}
            setValue={setMission}
            placeholder="미션을 추가해 주세요"
            activeBorder={false}
          />
        </View>
        <View className="flex w-[20%]">
          <Button
            label="추가"
            size="menu"
            disabled={mission.length <= 3}
            onPress={addCustomMission}
          />
        </View>
      </View>
      <View className="border-b border-inactive-background" />
      <MissionList
        selectedMissions={selectedMissions}
        setSelectedMissions={setSelectedMissions}
        customMissions={customMissions}
      />
    </View>
  );
}
