import { Button, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { View } from "react-native";
import { useGetRoomMembers } from "../query/useGetRoomMembers";
import { useEffect, useState } from "react";
import { roomMember } from "../type/type";
import MemberCard from "./memberCard";
import { useDenyMember } from "../query/useDenyMember";
import { useAcceptMember } from "../query/useAcceptMember";

interface WaitingMemberListProps {
  roomId: string;
}
export default function WaitingMemberList({ roomId }: WaitingMemberListProps) {
  const { data: members } = useGetRoomMembers(roomId);
  const [waitingMember, setWaitingMember] = useState<roomMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<number>(-1);
  const { mutate: deny } = useDenyMember();
  const { mutate: accept } = useAcceptMember();

  useEffect(() => {
    if (!members) return;
    setWaitingMember(members.filter((member) => member.standbyYn === true));
  }, [members]);

  return (
    <View className="flex flex-col">
      <View className="flex w-full flex-row justify-between items-center py-4">
        <Typography
          label={`대기중인 인원(${waitingMember.length})`}
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
        <View className="flex flex-row items-center gap-2">
          <Button
            label="승인"
            size="menu"
            disabled={selectedMember === -1}
            onPress={() => accept({ roomId, roomUserId: selectedMember })}
          />
          <Button
            label="거절"
            size="menu"
            className="bg-error"
            disabled={selectedMember === -1}
            onPress={() => deny({ roomId, roomUserId: selectedMember })}
          />
        </View>
      </View>
      <View className="flex flex-col gap-2">
        {waitingMember?.map((member) => (
          <MemberCard
            member={member}
            key={member.searchId}
            selectedMember={selectedMember}
            onPress={() => setSelectedMember(member.roomUserId)}
          />
        ))}
      </View>
    </View>
  );
}
