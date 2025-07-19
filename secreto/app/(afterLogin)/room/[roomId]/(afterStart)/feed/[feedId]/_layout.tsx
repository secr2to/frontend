import { BackButton, CustomTitle } from "@/widgets/header";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitle: () => <CustomTitle title="코멘트" />,
        presentation: "modal",
      }}
    />
  );
}
