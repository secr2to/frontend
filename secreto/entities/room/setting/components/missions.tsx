import { Image, View } from "react-native";
import MissionList from "./missionList";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Inputbox, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";

interface MissionListProps {
  selectedMissions: string[];
  setSelectedMissions: Dispatch<SetStateAction<string[]>>;
  allMissionList: string[];
  setAllMissionList: Dispatch<SetStateAction<string[]>>;
  isManager?: boolean;
  minimumMission: number;
}

export default function Missions({
  setSelectedMissions,
  selectedMissions,
  allMissionList,
  setAllMissionList,
  isManager = false,
  minimumMission = 1,
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
      {isManager && (
        <>
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
        </>
      )}
      {isManager ? (
        <MissionList
          minimumMission={minimumMission}
          isManager={isManager}
          allMissionList={allMissionList}
          setAllMissionList={setAllMissionList}
          selectedMissions={selectedMissions}
          setSelectedMissions={setSelectedMissions}
          customMissions={customMissions}
        />
      ) : (
        <View className="flex-1 items-center justify-center gap-10">
          <Image
            source={require("@/shared/images/default.png")}
            className="w-40 h-40"
            resizeMode="contain"
          />
          <Typography
            label="미션은 게임 시작 후 확인이 가능합니다"
            style={TYPOGRAPHY_TYPE.MAIN_TITLE}
          />
        </View>
      )}
    </View>
  );
}
