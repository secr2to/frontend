import AllMissions from "@/entities/room/missions/component/allMissions";
import CurrentMissions from "@/entities/room/missions/component/currentMissions";
import MissionListFallback from "@/entities/room/missions/component/missionListFallback";
import { NavMenu } from "@/shared/components";
import { Suspense, useState } from "react";
import { View } from "react-native";

export default function Mission() {
  const [state, setState] = useState("current");
  return (
    <View className="flex-1 bg-default-background">
      <NavMenu
        state={state}
        setState={setState}
        items={[
          {
            label: "현재 미션",
            state: "current",
          },
          {
            label: "전체 미션",
            state: "all",
          },
        ]}
      />
      <View className="flex-1 p-5">
        <Suspense
          fallback={<MissionListFallback type={state as "current" | "all"} />}
        >
          {state === "current" && <CurrentMissions />}
          {state === "all" && <AllMissions />}
        </Suspense>
      </View>
    </View>
  );
}
