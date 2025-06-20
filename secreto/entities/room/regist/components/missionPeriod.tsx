import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface RegistRoomNameProps {
  missionPeriod: string;
  setMissionPeriod: Dispatch<SetStateAction<string>>;
}

export default function RegistMissionPeriod({
  missionPeriod,
  setMissionPeriod,
}: RegistRoomNameProps) {
  return (
    <>
      <Typography
        label="미션 주기는 어떻게 할까요?"
        style={TYPOGRAPHY_TYPE.MAIN_TITLE}
      />
      <View className="w-full">
        <Picker
          selectedValue={missionPeriod}
          onValueChange={(itemValue, itemIndex) => setMissionPeriod(itemValue)}
        >
          <Picker.Item label="1일" value="1" />
          <Picker.Item label="3일" value="3" />
          <Picker.Item label="1주일" value="7" />
        </Picker>
      </View>
    </>
  );
}
