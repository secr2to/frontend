import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { View } from "react-native";
import { useGetReplies } from "../query/useGetReplies";

interface ReplyListProps {
  roomId: string;
  feedId: number;
}

export default function ReplyCount({ roomId, feedId }: ReplyListProps) {
  const { data: reply } = useGetReplies(roomId, feedId);
  return (
    <View>
      <Typography
        label={`댓글 ${reply?.length}개`}
        style={TYPOGRAPHY_TYPE.BODY_BOLD}
      />
    </View>
  );
}
