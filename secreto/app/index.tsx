import useUserStore from "@/shared/stores/useUserStore";
import { Redirect } from "expo-router";

export default function Home() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Redirect href="/main" /> : <Redirect href="/signIn" />;
}
