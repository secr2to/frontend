import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { Spacing } from "@/shared/components";
import ParticipantCard from "./participantCard";
import useUserStore from "@/shared/stores/useUserStore";
import { useState } from "react";
import { roomMember } from "../../setting/type/type";
import { useSuspenseGetRoomMembers } from "../query/useGetRoomMebers";
import RoomUserPopup from "./roomUserPopup";

type ParticipantsListProps = {
  roomId: string;
};
export default function ParticipantsList({ roomId }: ParticipantsListProps) {
  const { data: participants } = useSuspenseGetRoomMembers(roomId);
  const user = useUserStore((state) => state.user);
  const [roomUser, setRoomUser] = useState<roomMember | null>(null);
  return (
    <>
      <View className="flex-1 p-1">
        <FlashList
          data={participants}
          keyExtractor={(item) => item.roomUserId.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <ParticipantCard
              imageUri={item.profileUrl ?? item.roomCharacterUrl}
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
