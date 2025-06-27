import { Inputbox, Profile, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import { Dispatch, SetStateAction } from "react";
import { Image, Pressable, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Character from "@/shared/components/Profile/chracter";

interface RegistRoomNameProps {
  roomName: string;
  openProfileOption: boolean;
  setOpenProfileOption: Dispatch<SetStateAction<boolean>>;
  profileImageUri: string;
  setProfileImage: Dispatch<SetStateAction<File | undefined>>;
  setProfileImageUri: Dispatch<SetStateAction<string>>;
  setCharacterPopup: Dispatch<SetStateAction<boolean>>;
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  setUseProfile: Dispatch<SetStateAction<boolean>>;
  useProfile: boolean;
  clothesColor: string;
  skinColor: string;
}
export default function RegistProfile({
  setProfileImage,
  setProfileImageUri,
  setCharacterPopup,
  useProfile,
  roomName,
  openProfileOption,
  setOpenProfileOption,
  profileImageUri,
  nickname,
  setNickname,
  setUseProfile,
  clothesColor,
  skinColor,
}: RegistRoomNameProps) {
  const pickProfile = async (option: string) => {
    setOpenProfileOption(false);
    if (option === "image") {
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

        setProfileImage(file);
        setProfileImageUri(uri);
        setUseProfile(true);
      } else {
        console.error("Image selection was canceled or invalid.");
      }
    } else {
      setCharacterPopup(true);
    }
  };

  return (
    <>
      <Typography label={roomName} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
      <Typography
        label="마니또에서 사용할 프로필을 설정해 주세요."
        style={TYPOGRAPHY_TYPE.MAIN_REGULAR}
      />
      <View className="relative flex flex-col my-5">
        <View>
          {useProfile ? (
            <Profile size="xlarge" imageUri={profileImageUri} />
          ) : (
            <View className="border rounded-full border-primary p-2">
              <Character clothName={clothesColor} skinName={skinColor} />
            </View>
          )}
          <Pressable onPress={() => setOpenProfileOption(true)}>
            <View className="size-10 rounded-full bg-grayDark absolute right-2 bottom-2">
              <Image
                source={require("@/shared/images/camera.png")}
                className="w-full h-full p-2"
                resizeMode="contain"
              />
            </View>
          </Pressable>
          {openProfileOption && (
            <View className="absolute flex flex-col gap-2 right-4 w-[200px] h-[100px] bottom-4 bg-black border border-grayDark bg-opacity-70 rounded-lg p-1">
              <Pressable
                className="flex-1 items-center justify-center border-white border rounded-md active:opacity-50"
                onPress={() => pickProfile("image")}
              >
                <Typography
                  label="앨범에서 사진 선택"
                  style={TYPOGRAPHY_TYPE.SUB_BOLD}
                  color={COLOR.WHITE}
                />
              </Pressable>
              <Pressable
                className="flex-1 items-center justify-center border-white border rounded-md"
                onPress={() => pickProfile("character")}
              >
                <Typography
                  label="캐릭터에서 고르기"
                  style={TYPOGRAPHY_TYPE.SUB_BOLD}
                  color={COLOR.WHITE}
                />
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <Inputbox
        className="bg-base-background placeholder:text-gray-500"
        placeholder="게임 내에서 사용할 닉네임을 입력해주세요"
        value={nickname}
        setValue={setNickname}
      />
      <Typography
        label={`닉네임은 등록 이후 변경이 불가하니, ${"\n"} 원하는 이름이 맞는지 다시 한 번 확인해 주세요.`}
        className="text-center"
        color={COLOR.INACTIVE}
      />
    </>
  );
}
