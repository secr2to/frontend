import ReplyContextProvider from "@/entities/room/feeds/reply/component/replyContext";
import { BackButton, CustomTitle } from "@/widgets/header";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <ReplyContextProvider>
      <Stack
        screenOptions={{
          headerLeft: () => <BackButton />,
          headerTitle: () => <CustomTitle title="코멘트" />,
          presentation: "modal",
        }}
      />
    </ReplyContextProvider>
  );
}
