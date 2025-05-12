import { Stack } from "expo-router";
import "@/global.css";
import "@/shared/fonts/pretendard.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivityIndicator, StatusBar } from "react-native";
import useUserStore from "@/shared/stores/useUserStore";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserInfo } from "@/entities/users/api";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const saveUser = useUserStore((state) => state.saveUser);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserInfo();
        if (response?.data) {
          saveUser(response.data);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(beforeLogin)" />
        <Stack.Screen name="(afterLogin)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar />
    </QueryClientProvider>
  );
}
