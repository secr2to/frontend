import { Stack } from "expo-router";
import "@/global.css";
import "@/shared/fonts/pretendard.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar />
    </QueryClientProvider>
  );
}
