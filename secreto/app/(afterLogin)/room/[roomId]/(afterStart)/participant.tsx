import ParticipantsList from "@/entities/room/participants/components/pariticipantsList";
import ParticipantsListFallback from "@/entities/room/participants/components/participantsListFallback";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";

export default function Participant() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  return (
    <View className="flex-1 bg-default-background">
      <Suspense fallback={<ParticipantsListFallback />}>
        <ParticipantsList roomId={roomId} />
      </Suspense>
    </View>
  );
}
