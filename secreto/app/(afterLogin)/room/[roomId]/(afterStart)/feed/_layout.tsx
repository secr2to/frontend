import { Button } from "@/shared/components";
import { useThemeColors } from "@/shared/themes/useTheme";
import { BackButton, CustomTitle } from "@/widgets/header";
import { router, Stack, useLocalSearchParams } from "expo-router";

export default function Layout() {
  const theme = useThemeColors();
  const { roomId } = useLocalSearchParams() as { roomId: string };
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerStyle: {
          backgroundColor: theme.baseBackground,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <CustomTitle title="피드" />,
          headerRight: () => (
            <Button
              label="피드 등록"
              size="menu"
              onPress={() =>
                router.push(
                  `/(afterLogin)/room/${roomId}/(afterStart)/feed/regist`
                )
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="[feedId]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="regist"
        options={{
          headerTitle: () => <CustomTitle title="피드 등록" />,
        }}
      />
      <Stack.Screen
        name="selectTag"
        options={{
          presentation: "modal",
          headerTitle: () => <CustomTitle title="사람 태그하기" />,
        }}
      />
    </Stack>
  );
}
