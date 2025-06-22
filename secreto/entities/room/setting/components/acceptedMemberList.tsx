import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { View } from "react-native";
import { useGetRoomMembers } from "../query/useGetRoomMembers";
import { useEffect, useState } from "react";
import MemberCard from "./memberCard";
import { roomMember } from "../type/type";

interface AcceptedMemberListProps {
  roomId: string;
}

export default function AcceptedMemberList({
  roomId,
}: AcceptedMemberListProps) {
  const { data: members } = useGetRoomMembers(roomId);
  const [acceptedMember, setAcceptedMember] = useState<roomMember[]>([]);

  useEffect(() => {
    if (!members) return;
    setAcceptedMember(members.filter((member) => member.standbyYn === false));
  }, [members]);

  return (
    <View className="flex flex-col">
      <View className="flex w-full flex-row justify-between items-center py-4">
        <Typography
          label={`참여중인 인원(${acceptedMember.length})`}
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
      </View>
      {acceptedMember?.map((member) => (
        <MemberCard member={member} key={member.searchId} />
      ))}
    </View>
  );
}
