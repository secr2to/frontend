import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { useState } from "react";
import { Button, SearchInputBox, Typography } from "@/shared/components";
import TagMemberList from "@/entities/room/feeds/feed/component/tagMemberList";

export default function TagModal() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const params = useLocalSearchParams() as { selectedTags?: string };
  const [selectedTags, setSelectedTags] = useState<number[]>(
    params.selectedTags ? JSON.parse(params.selectedTags) : []
  );
  const [name, setName] = useState("");

  const handleConfirm = () => {
    router.dismissTo({
      pathname: "./regist",
      params: { selectedTags: JSON.stringify(selectedTags) },
    });
  };

  return (
    <View className="flex-1 bg-default-background">
      <View className="flex px-5 py-4 border-b border-inactive-background">
        <SearchInputBox
          className="w-full h-10"
          value={name}
          setValue={setName}
          placeholder="유저 이름 검색"
        />
      </View>
      {/* 유저 리스트를 여기에 추가 */}
      <View className="flex flex-row justify-end items-center px-4 py-2">
        <Button label="태그" onPress={handleConfirm} />
      </View>
      <TagMemberList
        roomId={roomId}
        search={name}
        selectedMembers={selectedTags}
        setSelectedMembers={setSelectedTags}
      />
    </View>
  );
}
