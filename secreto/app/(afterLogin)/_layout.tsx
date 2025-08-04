import GlobalSocketProvider from "@/shared/websocket/provider/globalSocketProvider";
import useUserStore from "@/shared/stores/useUserStore";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) return <Redirect href="/(beforeLogin)/signIn" />;

  return (
    <GlobalSocketProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalSocketProvider>
  );
}
