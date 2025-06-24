import { Button, Typography } from "@/shared/components";
import { useState } from "react";
import { Image, View } from "react-native";
import {
  clothColorData,
  skinColorData,
} from "@/shared/components/Profile/color";
import RegistProfile from "@/entities/room/regist/components/profile";
import CharacterSelectPopup from "@/entities/room/regist/components/characterSelectPopup";
import RegistIntroduction from "@/entities/room/regist/components/introduction";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { registStep } from "@/entities/room/regist/type/type";
import { useLocalSearchParams } from "expo-router";
import { useSettingProfile } from "@/entities/room/setting/query/useSettingProfile";

export default function Waiting() {
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const [useProfile, setUseProfile] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File>();
  const [profileImageUri, setProfileImageUri] = useState<string>("");
  const [step, setStep] = useState<registStep>("profile");
  const [clothesColor, setClothesColor] = useState<string>(
    clothColorData[Math.floor(Math.random() * clothColorData.length)]?.name
  );
  const [skinColor, setSkinColor] = useState<string>(
    skinColorData[Math.floor(Math.random() * skinColorData.length)]?.name
  );
  const [openProfileOption, setOpenProfileOption] = useState<boolean>(false);
  const [characterPopup, setCharacterPopup] = useState<boolean>(false);
  const [characterOption, setCharacterOption] = useState<string>("skin");
  const { mutate, isPending } = useSettingProfile(roomId);

  const stepController = () => {
    switch (step) {
      case "profile":
        setStep("introduction");
        break;
    }
  };

  const settingProfile = () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("useProfileYn", useProfile.toString());
    formData.append("selfIntroduction", introduction);
    if (useProfile) {
      formData.append("profileImage", profileImage as File);
    } else {
      formData.append("clothesColor", clothesColor);
      formData.append("skinColor", skinColor);
    }

    mutate(formData);
  };

  const buttonLabel = () => {
    switch (step) {
      case "profile":
        return "다음";
      case "introduction":
        return "입장 신청";
      default:
        return "확인";
    }
  };

  if (isPending) {
    return (
      <View className="flex-1 flex-col gap-4 items-center justify-center bg-default-background">
        <Image
          source={require("@/shared/images/splash-icon.png")}
          className="w-48 h-48 animate-pulse"
          resizeMode="contain"
        />
        <Typography
          label="마니또 게임에 입장 신청 중 입니다..."
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-default-background">
      {/* !TODO: 개선 과정에서 상단 진행 바 구현 예정 */}
      <View className="relative flex-1 px-5 py-10">
        <View className="flex flex-col items-center gap-5">
          {step === "profile" && (
            <RegistProfile
              useProfile={useProfile}
              clothesColor={clothesColor}
              skinColor={skinColor}
              nickname={nickname}
              setNickname={setNickname}
              roomName={""}
              openProfileOption={openProfileOption}
              setOpenProfileOption={setOpenProfileOption}
              profileImageUri={profileImageUri}
              setProfileImage={setProfileImage}
              setProfileImageUri={setProfileImageUri}
              setCharacterPopup={setCharacterPopup}
              setUseProfile={setUseProfile}
            />
          )}
          {step === "introduction" && (
            <RegistIntroduction
              roomName={""}
              introduction={introduction}
              setIntrduction={setIntroduction}
            />
          )}
        </View>
        <View className="absolute w-full self-center bottom-12 gap-1">
          <Button
            label={buttonLabel()}
            size="medium"
            disabled={
              (step === "profile" && nickname.length < 2) ||
              (step === "introduction" && introduction.length < 5)
            }
            onPress={step === "introduction" ? settingProfile : stepController}
          />
        </View>
      </View>
      {characterPopup && (
        <CharacterSelectPopup
          setUseProfile={setUseProfile}
          setCharacterPopup={setCharacterPopup}
          clothesColor={clothesColor}
          skinColor={skinColor}
          setProfileImage={setProfileImage}
          setProfileImageUri={setProfileImageUri}
          characterOption={characterOption}
          setCharacterOption={setCharacterOption}
          setSkinColor={setSkinColor}
          setClothesColor={setClothesColor}
        />
      )}
    </View>
  );
}
