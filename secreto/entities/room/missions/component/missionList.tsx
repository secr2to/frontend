import { Spacing, Typography } from "@/shared/components";
import { Image, View } from "react-native";
import MissionCard from "./missionCard";
import { FlashList } from "@shopify/flash-list";
import { ingameMission } from "../type/type";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";

type MissionListProps = {
  missions: ingameMission[];
};

const EmptyMission = () => {
  return (
    <View className="flex-1 w-full h-full items-center justify-center gap-8">
      <Image
        source={require("@/shared/images/splash-icon.png")}
        className="size-48"
        resizeMode="contain"
      />
      <Typography
        label="조건에 해당하는 미션이 존재하지 않습니다"
        style={TYPOGRAPHY_TYPE.SUB_BOLD}
      />
    </View>
  );
};

export default function MissionList({ missions }: MissionListProps) {
  return (
    <FlashList
      data={missions}
      estimatedItemSize={100}
      renderItem={({ item }) => <MissionCard mission={item} />}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={() => <Spacing size={16} />}
      ListEmptyComponent={<EmptyMission />}
    />
  );
}
