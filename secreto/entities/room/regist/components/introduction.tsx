import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { Dispatch, SetStateAction } from "react";
import { TextInput } from "react-native";

interface RegistRoomNameProps {
  roomName: string;
  introduction: string;
  setIntrduction: Dispatch<SetStateAction<string>>;
}
export default function RegistIntroduction({
  roomName,
  introduction,
  setIntrduction,
}: RegistRoomNameProps) {
  return (
    <>
      <Typography label={roomName} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
      <Typography
        label="게임 속 친구들에게 자신을 소개해 보세요."
        style={TYPOGRAPHY_TYPE.MAIN_TITLE}
      />
      <TextInput
        value={introduction}
        onChangeText={setIntrduction}
        placeholder="자기소개를 입력하세요"
        multiline
        className="bg-base-background relative flex w-full flex-start p-2 h-48 border rounded-[4px] border-grayLight"
      />
    </>
  );
}
