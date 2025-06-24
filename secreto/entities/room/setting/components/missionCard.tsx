import { Typography } from "@/shared/components";
import Checkbox from "@/shared/components/Input/checkbox";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { View } from "react-native";

interface MissionCardProps {
  mission: string;
  onChecked: () => void;
  onUnchecked?: () => void;
  checked?: boolean;
}

export default function MissionCard({
  mission,
  onChecked,
  onUnchecked,
  checked = false,
}: MissionCardProps) {
  return (
    <View className="flex flex-row items-center justify-between">
      <Typography label={mission} style={TYPOGRAPHY_TYPE.MAIN_REGULAR} />
      <Checkbox
        onChecked={onChecked}
        onUnchecked={onUnchecked}
        check={checked}
      />
    </View>
  );
}
