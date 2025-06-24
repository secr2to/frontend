import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import RoomInfo from "./roominfo";
import { roomInfo } from "../../regist/type/type";

interface RoomInfoProps {
  roomInfo: roomInfo;
  isManager?: boolean;
}

export default function RoomInfoList({
  roomInfo,
  isManager = false,
}: RoomInfoProps) {
  return (
    <View className="flex-1 flex-col gap-2 px-10 py-5">
      <View className="flex flex-col gap-2 w-full justify-center items-center">
        <View className="border border-inactive-background rounded-full">
          <Image
            source={roomInfo.imageUrl || require("@/shared/images/default.png")}
            className="w-36 h-36"
            resizeMode="contain"
          />
        </View>
      </View>
      {isManager && (
        <RoomInfo
          route={isManager ? () => router.push("./roomProfile") : undefined}
          label="방 이미지 수정"
        />
      )}
      <RoomInfo label="방 이름" value={roomInfo.name} />
      <RoomInfo
        label="마니또 종료일"
        route={isManager ? () => router.push("./endDate") : undefined}
        value={roomInfo.endDate.toString().split("T")[0]}
      />
      <RoomInfo
        label={"미션 주기"}
        route={isManager ? () => router.push("./missionPeriod") : undefined}
        value={roomInfo.missionPeriod + "일"}
      />
    </View>
  );
}
