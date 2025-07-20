import { View } from "react-native";
import { reply } from "../type/type";
import { Profile, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import HeartIcon from "@/shared/components/Icons/heart";

interface NestedReplyProps {
  reply: reply;
}

export default function NestedReply({ reply }: NestedReplyProps) {
  return (
    <>
      {/* comment wrapper */}
      <View className="gap-4">
        {/* main commnet */}
        <View className="flex flex-row items-center gap-3">
          <View>
            <Profile size="small" imageUri={reply.replier.profileUrl} />
          </View>
          <View className="flex flex-col gap-1">
            <Typography
              label={reply.replier.roomNickname}
              style={TYPOGRAPHY_TYPE.SUB_BOLD}
            />
            <Typography label={reply.content} />
          </View>
          <HeartIcon />
        </View>
      </View>
    </>
  );
}
