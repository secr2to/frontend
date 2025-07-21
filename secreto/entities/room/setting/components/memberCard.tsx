import { Profile, Typography } from "@/shared/components";
import { Pressable, View } from "react-native";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { clsx } from "@/shared/utils";
import { roomMemberInfo } from "../../participants/type/type";

interface MemberCardProps {
  profileImage: string;
  member: roomMemberInfo;
  selectedMembers?: number[];
  onPress?: () => void;
}
export default function MemberCard({
  member,
  selectedMembers,
  onPress,
  profileImage,
}: MemberCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        className={clsx(
          "flex flex-row w-full gap-4 py-2 px-2 items-center rounded-md",
          selectedMembers?.includes(member.roomUserId)
            ? "bg-active-background"
            : "bg-grayLight"
        )}
      >
        <Profile imageUri={profileImage} size="medium" resizeMode="cover" />
        <View className="flex flex-col gap-2">
          <Typography
            label={member.nickname}
            style={TYPOGRAPHY_TYPE.MAIN_TITLE}
            color={COLOR.BLACK}
          />
          <Typography
            label={member.searchId}
            style={TYPOGRAPHY_TYPE.CAPTION_BOLD}
            color={COLOR.INACTIVE}
          />
        </View>
      </View>
    </Pressable>
  );
}
