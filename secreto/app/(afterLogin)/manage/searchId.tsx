import { useChangeSearchId } from "@/entities/main/mypage/query/useChangeSearchId";
import { Button, Inputbox, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import useUserStore from "@/shared/stores/useUserStore";
import { useState } from "react";
import { View } from "react-native";

export default function ChagneSearchId() {
  const user = useUserStore((state) => state.user);
  const [name, setName] = useState("");
  const { mutate } = useChangeSearchId();

  return (
    <View className="flex-1 bg-default-background">
      <View className="flex-1 items-center p-10 gap-10">
        <Typography
          label={`현재 검색 ID : ${user?.searchId}`}
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
        <Inputbox
          activeBorder={false}
          placeholder="변경할 검색 ID를 입력해주세요"
          value={name}
          setValue={setName}
        />
        <View className="absolute bottom-20 flex w-full">
          <Button
            label="변경하기"
            size="medium"
            disabled={name.length < 2}
            onPress={() => mutate(name)}
          />
        </View>
      </View>
    </View>
  );
}
