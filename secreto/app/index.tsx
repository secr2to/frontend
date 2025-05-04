import { Redirect } from "expo-router";

export default function Home() {
  const isLoggedIn = false;

  return isLoggedIn ? <Redirect href="/main" /> : <Redirect href="/signIn" />;
}
