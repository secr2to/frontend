import { useThemeColors } from "@/shared/themes/useTheme";
import { BackButton, CustomTitle } from "@/widgets/header";
import { Stack, useLocalSearchParams } from "expo-router";

export default function Layout() {
  const theme = useThemeColors();
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <CustomTitle title="인게임 프로필 수정" />,
        headerLeft: () => <BackButton />,
        headerStyle: {
          backgroundColor: theme.baseBackground,
        },
      }}
    />
  );
}
