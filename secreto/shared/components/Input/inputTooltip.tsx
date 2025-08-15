import { Pressable, View } from "react-native";
import Typography from "../Typography/typography";
import { COLOR, TYPOGRAPHY_TYPE } from "../Typography/constant";

interface InputTooltipProps {
  tooltip: string;
  onPress: () => void;
}

export default function InputTooltip({ onPress, tooltip }: InputTooltipProps) {
  return (
    <View className="flex flex-row items-center w-full justify-between h-8 px-2 bg-inactive-background rounded-md">
      <Typography label={tooltip} color={COLOR.INACTIVE} />
      <Pressable onPress={onPress}>
        <Typography
          label="X"
          className="p-2"
          style={TYPOGRAPHY_TYPE.SUB_BOLD}
          color={COLOR.BASE}
        />
      </Pressable>
    </View>
  );
}
