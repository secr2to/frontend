import { ScrollView } from "react-native";
import FeedFallback from "./feedFallback";

export default function FeedListFallback() {
  return (
    <ScrollView>
      {Array.from({ length: 5 }).map((_, index) => (
        <FeedFallback key={index} />
      ))}
    </ScrollView>
  );
}
