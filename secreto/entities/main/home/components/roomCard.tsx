import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { router } from "expo-router";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";
import { roomStatus } from "../type/type";
import { useState } from "react";

interface RoomCardProps {
  roomId: number;
  name: string;
  status: roomStatus;
  code: string;
  startDate: string;
  endDate: string;
  missionPeriod: number;
  imageUrl: ImageSourcePropType | string;
  nickname: string;
  roomUserCount: number;
}
export default function RoomCard({
  roomId,
  name,
  status,
  code,
  startDate,
  endDate,
  imageUrl,
  nickname,
  roomUserCount,
}: RoomCardProps) {
  const statusMap: Record<string, string> = {
    WAITING: "대기중",
    PROGRESS: "진행중",
    TERMINATED: "종료됨",
  };

  const getDate = () => {
    switch (status) {
      case "TERMINATED":
        return `종료일 ${endDate}`;
      case "WAITING":
        return `시작전 ~ ${endDate}`;
      default:
        return `${startDate} ~ ${endDate}`;
    }
  };
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Pressable
      onPress={() => router.push(`/room/${roomId}`)}
      className="active:opacity-80 active:bg-grayLight"
    >
      <View className="flex flex-row w-full py-2">
        {imageUrl && (
          <Image
            source={
              loading
                ? require("@/shared/images/default.png")
                : typeof imageUrl === "string"
                ? { uri: imageUrl }
                : imageUrl
            }
            className="w-[80px] h-[80px] rounded-[5px] border border-inactive-background"
            resizeMode="cover"
            onLoadEnd={() => setLoading(false)}
          />
        )}
        {!imageUrl && (
          <Image
            source={require("@/shared/images/default.png")}
            className="w-[80px] h-[80px] rounded-[5px] border border-inactive-background"
            resizeMode="cover"
          />
        )}
        <View className="flex-1 flex-col p-2 gap-1">
          <Typography label={name} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
          <Typography label={getDate()} style={TYPOGRAPHY_TYPE.CAPTION_BOLD} />
          <Typography
            label={`${statusMap[status]} | ${roomUserCount} | ${code}`}
            style={TYPOGRAPHY_TYPE.CAPTION_REGULAR}
          />
          <Typography label={nickname} style={TYPOGRAPHY_TYPE.BODY_REGULAR} />
        </View>
      </View>
    </Pressable>
  );
}
