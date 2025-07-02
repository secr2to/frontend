import { CardPopup, Profile, Typography } from "@/shared/components";
import { Dispatch, SetStateAction } from "react";
import { roomMember } from "../../setting/type/type";
import { View } from "react-native";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";

interface RoomUserPopupProps {
  setRoomUser: Dispatch<SetStateAction<roomMember | null>>;
  roomUser: roomMember;
}

export default function RoomUserPopup({
  setRoomUser,
  roomUser,
}: RoomUserPopupProps) {
  return (
    <CardPopup onClose={() => setRoomUser(null)}>
      <View className="w-full px-5 py-2 gap-4">
        <View className="flex flex-row items-center gap-4 px-6">
          <Profile
            size="large"
            imageUri={roomUser.profileUrl ?? roomUser.roomCharacterUrl}
          />
          <View className="gap-2">
            <Typography
              label={roomUser.nickname}
              style={TYPOGRAPHY_TYPE.MAIN_TITLE}
              color={COLOR.BASE}
            />
            <Typography
              label={roomUser.searchId}
              style={TYPOGRAPHY_TYPE.MAIN_REGULAR}
              color={COLOR.BASE}
            />
          </View>
        </View>
        <View className="flex w-full bg-inactive-background rounded-[5px] p-4">
          <Typography
            label={roomUser.selfIntroduction}
            style={TYPOGRAPHY_TYPE.SUB_REGULAR}
            color={COLOR.BASE}
          />
        </View>
      </View>
    </CardPopup>
  );
}
