import { CardPopup, Inputbox, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import { useJoinRoom } from "../query/useJoinRoom";

interface JoinRoomPopupProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function JoinRoomPopup({ setModal }: JoinRoomPopupProps) {
  const [inviteCode, setInviteCode] = useState("");
  const { mutate, isError } = useJoinRoom();

  return (
    <CardPopup
      onClose={() => setModal(false)}
      onSuccess={() => mutate(inviteCode)}
      confirmLabel="입장하기"
      confirmDisabled={!inviteCode.trim()}
    >
      <View className="flex flex-col gap-4 w-full items-center px-4 py-10">
        <Typography
          label="방 초대코드를 입력해주세요"
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
          color={COLOR.BASE}
        />
        <Inputbox value={inviteCode} setValue={setInviteCode} />
        {isError && (
          <Typography
            label="잘못된 초대코드입니다."
            color={COLOR.ERROR}
            style={TYPOGRAPHY_TYPE.SUB_REGULAR}
          />
        )}
      </View>
    </CardPopup>
  );
}
