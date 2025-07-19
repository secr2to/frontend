import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { Image, View } from "react-native";

export default function EmptyFeed() {
  return (
    <View className="flex-1 bg-default-background items-center justify-center gap-10">
      <Image
        source={require("@/shared/images/default.png")}
        className="size-48"
        resizeMode="contain"
      />
      <Typography
        label="현재 작성된 피드가 없습니다"
        style={TYPOGRAPHY_TYPE.MAIN_TITLE}
      />
      <Typography
        label="제일 먼저 피드를 작성해 보세요"
        style={TYPOGRAPHY_TYPE.MAIN_TITLE}
      />
    </View>
  );
}
