import { Button, Profile, Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useGetRoomInfo } from "@/entities/room/regist/query/useGetRoomInfo";
import { useChangeRoomProfile } from "@/entities/room/setting/query/useChangeRoomProfie";

export default function RoomProfile() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { data: roomInfo } = useGetRoomInfo(roomId as string);
  const { mutate } = useChangeRoomProfile();
  const [profile, setProfile] = useState<File>();
  const [profileUrl, setProfileUrl] = useState<string>(
    roomInfo?.imageUrl || ""
  );

  const pickProfile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!result.canceled && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop() || "profile";
      const fileType = uri.split(".").pop() || "image/jpeg";

      const file = {
        uri,
        name: fileName,
        type: fileType,
      } as any;

      setProfileUrl(uri);
      setProfile(file);
    } else {
      console.error("Image selection was canceled or invalid.");
    }
  };

  return (
    <View className="flex-1 bg-default-background">
      <View className="flex flex-col w-full items-center py-10 px-5 gap-4">
        <Typography
          label="방의 이미지를 변경해 주세요"
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
        <View>
          {profileUrl ? (
            <Profile size="xlarge" imageUri={profileUrl} resizeMode="cover" />
          ) : (
            <View className="border border-inactive-background rounded-full p-2">
              <Image
                source={require("@/shared/images/default.png")}
                className="w-40 h-40 rounded-full"
                resizeMode="cover"
              />
            </View>
          )}
          <Pressable onPress={pickProfile}>
            <View className="size-10 rounded-full bg-grayDark absolute right-2 bottom-2">
              <Image
                source={require("@/shared/images/camera.png")}
                className="w-full h-full p-2"
                resizeMode="contain"
              />
            </View>
          </Pressable>
        </View>
      </View>
      <View className="absolute bottom-10 px-5 flex w-full">
        <Button
          label="확인"
          size="medium"
          disabled={!profile}
          onPress={() => mutate({ roomId, image: profile as File })}
        />
      </View>
    </View>
  );
}
