import { View } from "react-native";
import { clsx } from "@/shared/utils";
import TypographyFallback from "@/shared/components/fallback/typograyFallback";

export default function NotificationFallback() {
  return (
    <View className={clsx("flex flex-col gap-4 p-2")}>
      <View className="flex flex-row">
        <TypographyFallback length="medium" size="small" />
      </View>
      <View>
        <TypographyFallback length="long" size="small" />
      </View>
      <View>
        <TypographyFallback length="short" size="small" />
      </View>
    </View>
  );
}
