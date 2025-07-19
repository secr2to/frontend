import { View } from "react-native";
import ProfileFallback from "@/shared/components/fallback/profileFallback";
import TypographyFallback from "@/shared/components/fallback/typograyFallback";

export default function ReplyFallback() {
  return (
    <>
      {/* comment wrapper */}
      <View className="gap-4">
        {/* main commnet */}
        <View className="flex flex-row items-center gap-3">
          <View>
            <ProfileFallback size="small" />
          </View>
          <View className="flex flex-col gap-1">
            <TypographyFallback length="short" />
            <TypographyFallback length="medium" />
          </View>
          <View className="flex-1 gap-1">
            <TypographyFallback size="medium" className="w-48" />
          </View>
        </View>
      </View>
    </>
  );
}
