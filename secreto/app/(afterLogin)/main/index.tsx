import RoomList from "@/entities/main/home/components/roomList";
import { badgeItems, menuItems } from "@/entities/main/home/data/menuData";
import { Button, NavMenu } from "@/shared/components";
import BadgeMenu from "@/shared/components/Menus/badgeMenu";
import { Suspense, useMemo, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import RoomListFallback from "@/entities/main/home/components/roomFallbackList";
import { roomStatus } from "@/entities/main/home/type/type";
import { BUTTON_SIZE, BUTTON_STYLE } from "@/shared/components/Button/constant";
import JoinRoomPopup from "@/entities/main/home/components/joinRoomPopup";

export default function Home() {
  const [state, setState] = useState(menuItems[0].state);
  const [gameStatus, setGameStatus] = useState(badgeItems[0].state);
  const [modal, setModal] = useState(false);

  const status = useMemo(() => {
    return state === "history" ? "TERMINATED" : (gameStatus as roomStatus);
  }, [state, gameStatus]);

  return (
    <View className="flex-1 bg-default-background">
      <NavMenu items={menuItems} state={state} setState={setState} />
      {state !== "history" && (
        <BadgeMenu
          items={badgeItems}
          state={gameStatus}
          setState={setGameStatus}
        />
      )}
      <Suspense fallback={<RoomListFallback />}>
        <RoomList state={status} />
      </Suspense>
      <View className="absolute bottom-0 bg-base-background p-5 w-full h-[60px] gap-2">
        <View className="flex-1 items-center justify-center gap-4 flex-row">
          <Button
            label="방 입장하기"
            size={BUTTON_SIZE.MEDIUM}
            onPress={() => setModal(true)}
          />
          <Button
            label="방 만들기"
            size={BUTTON_SIZE.MEDIUM}
            style={BUTTON_STYLE.REVERSE}
            onPress={() => router.push("/(afterLogin)/room-regist")}
          />
        </View>
      </View>
      {modal && <JoinRoomPopup setModal={setModal} />}
    </View>
  );
}
