import { Button, Typography } from "@/shared/components";
import { useState } from "react";
import { Image, View } from "react-native";
import {
  clothColorData,
  skinColorData,
} from "@/shared/components/Profile/color";
import RegistRoomName from "@/entities/room/regist/components/roomName";
import RegistEndDate from "@/entities/room/regist/components/endDate";
import RegistMissionPeriod from "@/entities/room/regist/components/missionPeriod";
import RegistProfile from "@/entities/room/regist/components/profile";
import CharacterSelectPopup from "@/entities/room/regist/components/characterSelectPopup";
import RegistIntroduction from "@/entities/room/regist/components/introduction";
import { useRegistRoom } from "@/entities/room/regist/query/useRegistRoom";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { registStep } from "@/entities/room/regist/type/type";

export default function RoomRegist() {
  const [roomName, setRoomName] = useState<string>("");
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [missionPeriod, setMissionPeriod] = useState<string>("1");
  const [useProfile, setUseProfile] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File>();
  const [profileImageUri, setProfileImageUri] = useState<string>("");
  const [step, setStep] = useState<registStep>("roomName");
  const [clothesColor, setClothesColor] = useState<string>(
    clothColorData[Math.floor(Math.random() * clothColorData.length)]?.name
  );
  const [skinColor, setSkinColor] = useState<string>(
    skinColorData[Math.floor(Math.random() * skinColorData.length)]?.name
  );
  const [openProfileOption, setOpenProfileOption] = useState<boolean>(false);
  const [characterPopup, setCharacterPopup] = useState<boolean>(false);
  const [characterOption, setCharacterOption] = useState<string>("skin");
  const { mutate, isPending } = useRegistRoom();

  const stepController = () => {
    switch (step) {
      case "roomName":
        setStep("endDate");
        break;
      case "endDate":
        setStep("missionPeriod");
        break;
      case "missionPeriod":
        setStep("profile");
        break;
      case "profile":
        setStep("introduction");
        break;
    }
  };

  const registRoom = () => {
    const formData = new FormData();
    formData.append("name", roomName);
    formData.append(
      "endDate",
      endDate.toISOString().split("T")[0] + "T00:00:00"
    );
    formData.append("missionPeriod", missionPeriod);
    formData.append("useProfileYn", useProfile.toString());
    formData.append("nickname", nickname);
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
      case "introduction":
        return "게임 생성";
      case "roomName":
        return "다음";
      case "endDate":
        return "다음";
      case "missionPeriod":
        return "다음";
      case "profile":
        return "다음";
      default:
        return "다음";
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
          label="마니또 게임을 생성 중 입니다..."
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
          {step === "roomName" && (
            <RegistRoomName roomName={roomName} setRoomName={setRoomName} />
          )}
          {step === "endDate" && (
            <RegistEndDate date={endDate} setDate={setEndDate} />
          )}
          {step === "missionPeriod" && (
            <RegistMissionPeriod
              missionPeriod={missionPeriod}
              setMissionPeriod={setMissionPeriod}
            />
          )}
          {step === "profile" && (
            <RegistProfile
              useProfile={useProfile}
              clothesColor={clothesColor}
              skinColor={skinColor}
              nickname={nickname}
              setNickname={setNickname}
              roomName={roomName}
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
              roomName={roomName}
              introduction={introduction}
              setIntrduction={setIntroduction}
            />
          )}
        </View>
        <View className="absolute w-full self-center bottom-12 gap-1">
          {/* !TODO: 로그인 정보 사용 관련 추후 구현 예정 */}
          {/* <View className="flex flex-row items-center">
            {step === "profile" && (
              <Checkbox
                label="로그인 정보 사용하기"
                checked={useProfile}
                onChange={() => setUseProfile(!useProfile)}
              />
            )}
          </View>
          <Spacing size={4} /> */}
          <Button
            label={buttonLabel()}
            size="medium"
            disabled={
              (step === "roomName" && roomName.length < 2) ||
              (step === "endDate" && !endDate) ||
              (step === "missionPeriod" && !missionPeriod) ||
              (step === "profile" && nickname.length < 2) ||
              (step === "introduction" && introduction.length < 5)
            }
            onPress={step === "introduction" ? registRoom : stepController}
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
