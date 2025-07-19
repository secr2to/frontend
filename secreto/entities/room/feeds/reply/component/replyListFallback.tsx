import { ScrollView, View } from "react-native";
import ReplyFallback from "./replyFallback";

export default function ReplyListFallback() {
  return (
    <ScrollView className="gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index.toString()} className="gap-2">
          {/* comment wrapper */}
          <ReplyFallback />
          {Array.from({ length: 2 }).map((_, subIndex) => (
            <View
              className="flex flex-row ml-10 items-center gap-3"
              key={`${index}-${subIndex}`}
            >
              <ReplyFallback />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
