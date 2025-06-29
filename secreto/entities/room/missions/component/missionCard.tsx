import { Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Image, View } from "react-native";
import { ingameMission } from "../type/type";

interface MissionCardProps {
  mission: ingameMission;
}

export default function MissionCard({ mission }: MissionCardProps) {
  return (
    <View className="relative flex w-full justify-center h-20 px-4 py-2 bg-inactive-background rounded-md">
      <View className="flex flex-row items-center gap-4">
        <Image
          source={require("@/shared/images/mission-image.png")}
          className="size-10"
        />
        <View className="flex flex-col gap-2">
          <Typography
            label={mission.content}
            style={TYPOGRAPHY_TYPE.MAIN_TITLE}
            color={COLOR.BASE}
          />
          {mission.createDate && (
            <Typography
              label={mission.createDate.toString().split("T")[0]}
              style={TYPOGRAPHY_TYPE.SUB_REGULAR}
              color={COLOR.INACTIVE}
            />
          )}
        </View>
        {mission.executeYn && (
          <View className="absolute inset-0 flex items-end justify-end">
            <Typography label="제공된 미션" color={COLOR.BASE} />
          </View>
        )}
      </View>
    </View>
  );
}
