import { useGetMyInfo } from "@/entities/room/common/query/useGetMyInfo";
import { useChangeSelfIntroduction } from "@/entities/room/modify/query/useChangeSelfIntroduction";
import { Button, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

export default function SelfIntroduction() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: myInfo } = useGetMyInfo(roomId);
  const [introduction, setIntrduction] = useState<string>(
    myInfo?.selfIntroduction || ""
  );
  const { mutate: changeSelfIntroduction } = useChangeSelfIntroduction();

  return (
    <View className="flex-1 bg-default-background">
      <View className="flex-1 items-center gap-4 p-10 py-20">
        <Typography
          label="자기 소개를 수정해보세요"
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
        <TextInput
          value={introduction}
          onChangeText={setIntrduction}
          placeholder="자기소개를 입력하세요"
          multiline
          className="bg-base-background relative flex w-full flex-start p-2 h-48 border rounded-[4px] border-grayLight"
        />
        <View className="absolute bottom-10 w-full gap-4">
          <Button
            label="저장하기"
            onPress={() =>
              myInfo &&
              changeSelfIntroduction({
                roomId,
                roomUserId: myInfo.roomUserId,
                selfIntroduction: introduction,
              })
            }
            disabled={!introduction || introduction.length <= 2}
            size="large"
          />
        </View>
      </View>
    </View>
  );
}
