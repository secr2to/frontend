import { View } from "react-native";
import { useEffect, useState } from "react";
import { useGetMyInfo } from "@/entities/room/common/query/useGetMyInfo";
import MemberCard from "@/entities/room/setting/components/memberCard";
import { useGetRoomMembersInfo } from "@/entities/room/participants/query/useGetRoomMebersInfo";
import { roomMemberInfo } from "@/entities/room/participants/type/type";
import { useGetRoomMembersProfile } from "@/entities/room/participants/query/useGetRoomMembersProfile";

interface TagMemberListProps {
  roomId: string;
  search?: string;
  selectedMembers: number[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<number[]>>;
}
export default function TagMemberList({
  roomId,
  search,
  selectedMembers,
  setSelectedMembers,
}: TagMemberListProps) {
  const { data: members } = useGetRoomMembersInfo(roomId);
  const { data: me } = useGetMyInfo(roomId);
  const [tagableMembers, setTagableMembers] = useState<roomMemberInfo[]>([]);
  const { data: membersProfile } = useGetRoomMembersProfile(roomId);

  useEffect(() => {
    if (!members) return;
    if (!search) {
      setTagableMembers(
        members.filter((member) => member.roomUserId !== me?.roomUserId)
      );
      return;
    }
    setTagableMembers(
      members.filter(
        (member) =>
          member.roomUserId !== me?.roomUserId &&
          (member.nickname.toUpperCase().includes(search.toUpperCase()) ||
            member.searchId.toUpperCase().includes(search.toUpperCase()))
      )
    );
  }, [members, search]);

  const handleSelect = (memberId: number) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
    } else {
      setSelectedMembers((prev) => [...prev, memberId]);
    }
  };

  return (
    <View className="flex flex-col">
      <View className="flex flex-col">
        {tagableMembers?.map((member) => (
          <MemberCard
            profileImage={
              membersProfile?.find(
                (profile) => profile.roomUserId === member.roomUserId
              )?.profileUrl || ""
            }
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
