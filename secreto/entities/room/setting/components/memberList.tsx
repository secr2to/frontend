import { ScrollView } from "react-native";
import WaitingMemberList from "./waitingMemberList";
import AcceptedMemberList from "./acceptedMemberList";

interface MemberListProps {
  roomId: string;
  isManager?: boolean;
}

export default function MemberList({
  roomId,
  isManager = false,
}: MemberListProps) {
  return (
    <ScrollView className="flex-1 flex-col gap-2 px-10 py-5">
      {isManager && <WaitingMemberList roomId={roomId} />}
      <AcceptedMemberList roomId={roomId} />
    </ScrollView>
  );
}
