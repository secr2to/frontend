import { useThemeColors } from "@/shared/themes/useTheme";
import { BackButton, CustomTitle } from "@/widgets/header";
import { Stack } from "expo-router";

export default function Layout() {
  const theme = useThemeColors();
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <CustomTitle title="방 만들기" />,
        headerLeft: () => <BackButton />,
        headerStyle: {
          backgroundColor: theme.baseBackground,
        },
      }}
    />
  );
}
