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
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const { mutate: deny } = useDenyMember();
  const { mutate: accept } = useAcceptMember();

  useEffect(() => {
    if (!members) return;
    setWaitingMember(members.filter((member) => member.standbyYn === true));
  }, [members]);

  const handleSelect = (memberId: number) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
    } else {
      setSelectedMembers((prev) => [...prev, memberId]);
    }
  };

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
            disabled={selectedMembers.length <= 0}
            onPress={() => accept({ roomId, roomUsers: selectedMembers })}
          />
          <Button
            label="거절"
            size="menu"
            className="bg-error"
            disabled={selectedMembers.length <= 0}
            onPress={() => deny({ roomId, roomUsers: selectedMembers })}
          />
        </View>
      </View>
      <View className="flex flex-col gap-2">
        {waitingMember?.map((member) => (
          <MemberCard
            member={member}
            key={member.searchId}
            selectedMembers={selectedMembers}
            onPress={() => handleSelect(member.roomUserId)}
          />
        ))}
      </View>
    </View>
  );
}
