import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { Spacing } from "@/shared/components";
import ParticipantCard from "./participantCard";
import useUserStore from "@/shared/stores/useUserStore";
import { useState } from "react";
import { useGetRoomMembersInfo } from "../query/useGetRoomMebersInfo";
import RoomUserPopup from "./roomUserPopup";
import { useGetRoomMembersProfile } from "../query/useGetRoomMembersProfile";
import { roomMemberInfo } from "../type/type";

type ParticipantsListProps = {
  roomId: string;
};
export default function ParticipantsList({ roomId }: ParticipantsListProps) {
  const { data: participantsProfile } = useGetRoomMembersProfile(roomId);
  const { data: participants } = useGetRoomMembersInfo(roomId);
  const user = useUserStore((state) => state.user);
  const [roomUser, setRoomUser] = useState<roomMemberInfo | null>(null);
  return (
    <>
      <View className="flex-1 p-1">
        <FlashList
          data={participants}
          keyExtractor={(item) => item.roomUserId.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <ParticipantCard
              imageUri={
                participantsProfile.find(
                  (profile) => profile.roomUserId === item.roomUserId
                )?.profileUrl || ""
              }
              name={item.nickname}
              searchId={item.searchId}
              isMe={item.searchId === user?.searchId}
              onPress={() => setRoomUser(item)}
            />
          )}
          ItemSeparatorComponent={() => <Spacing size={12} />}
          estimatedItemSize={140}
        />
      </View>
      {roomUser && (
        <RoomUserPopup roomUser={roomUser} setRoomUser={setRoomUser} />
      )}
    </>
  );
}
