import { Profile, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { clsx } from "@/shared/utils";
import { Pressable, View } from "react-native";

type pariticipanntCardProps = {
  imageUri: string;
  name: string;
  searchId: string;
  isMe: boolean;
  onPress?: () => void;
};

export default function ParticipantCard({
  imageUri,
  name,
  searchId,
  isMe = false,
  onPress,
}: pariticipanntCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "flex-1 border p-4 rounded-[5px] items-center justify-center gap-2 border-inactive-background mx-2",
        isMe ? "bg-active-background" : "bg-base-background"
      )}
    >
      {isMe && (
        <Typography
          label="나"
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
          color={COLOR.BASE}
          className="absolute top-2 right-2"
        />
      )}
      <Profile imageUri={imageUri} size="medium" />
      <View className="flex items-center">
        <Typography
          label={name}
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
          color={COLOR.BASE}
        />
        <Typography
          label={searchId}
          style={TYPOGRAPHY_TYPE.BODY_REGULAR}
          color={COLOR.BASE}
        />
      </View>
    </Pressable>
  );
}
