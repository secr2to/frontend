import { Button, Image, View } from "react-native";
import { Typography } from "../components";
import { TYPOGRAPHY_TYPE } from "../components/Typography/constant";

interface ErrorFallbackProps {
  content: string;
  handleRetry: () => void;
}

export default function ErrorFallback({
  content,
  handleRetry,
}: ErrorFallbackProps) {
  return (
    <View className="flex-1 items-center justify-center gap-10">
      <Image
        source={require("@/shared/images/crying.png")}
        className="size-40"
        resizeMode="contain"
      />
      <Typography label={content} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
      <Button title="재시도" onPress={handleRetry} />
    </View>
  );
}
