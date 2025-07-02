import { View } from "react-native";
import ParticipantCardFallback from "./participantCardFabllack";
import { Spacing } from "@/shared/components";
import { FlashList } from "@shopify/flash-list";

export default function ParticipantsListFallback() {
  return (
    <View className="flex-1 p-1">
      <FlashList
        data={Array.from({ length: 10 })}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        renderItem={() => <ParticipantCardFallback />}
        ItemSeparatorComponent={() => <Spacing size={12} />}
        estimatedItemSize={140}
      />
    </View>
  );
}
