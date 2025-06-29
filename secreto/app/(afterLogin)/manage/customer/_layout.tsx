import { useThemeColors } from "@/shared/themes/useTheme";
import { BackButton, CustomTitle } from "@/widgets/header";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <CustomTitle title={"고객 센터"} />,
        headerLeft: () => <BackButton />,
        headerStyle: { backgroundColor: useThemeColors().baseBackground },
      }}
    />
  );
}
