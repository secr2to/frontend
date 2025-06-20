import { Inputbox, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { Dispatch, SetStateAction } from "react";

interface RegistRoomNameProps {
  roomName: string;
  setRoomName: Dispatch<SetStateAction<string>>;
}
export default function RegistRoomName({
  roomName,
  setRoomName,
}: RegistRoomNameProps) {
  return (
    <>
      <Typography
        label="방 이름을 입력해주세요"
        style={TYPOGRAPHY_TYPE.MAIN_TITLE}
      />
      <Inputbox
        className="bg-base-background"
        placeholder="방 이름"
        value={roomName}
        setValue={setRoomName}
      />
    </>
  );
}
