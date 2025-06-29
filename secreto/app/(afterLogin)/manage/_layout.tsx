import { useThemeColors } from "@/shared/themes/useTheme";
import { BackButton, CustomTitle } from "@/widgets/header";
import { Stack } from "expo-router";

export default function Layout() {
  const theme = useThemeColors();
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <CustomTitle title={"프로필 수정"} />,
        headerStyle: { backgroundColor: theme.baseBackground },
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen name="customer" options={{ headerShown: false }} />
    </Stack>
  );
}
