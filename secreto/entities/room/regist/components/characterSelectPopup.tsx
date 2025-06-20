import { CardPopup, NavMenu } from "@/shared/components";
import Character from "@/shared/components/Profile/chracter";
import {
  clothColorData,
  skinColorData,
} from "@/shared/components/Profile/color";
import { Dispatch, SetStateAction, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

interface CharacterSelectPopupProps {
  setCharacterPopup: Dispatch<SetStateAction<boolean>>;
  clothesColor: string;
  skinColor: string;
  characterOption: string;
  setCharacterOption: Dispatch<SetStateAction<string>>;
  setSkinColor: Dispatch<SetStateAction<string>>;
  setClothesColor: Dispatch<SetStateAction<string>>;
  setUseProfile: Dispatch<SetStateAction<boolean>>;
  setProfileImage: Dispatch<SetStateAction<File | undefined>>;
  setProfileImageUri: Dispatch<SetStateAction<string>>;
}

export default function CharacterSelectPopup({
  setCharacterPopup,
  clothesColor,
  skinColor,
  characterOption,
  setCharacterOption,
  setSkinColor,
  setClothesColor,
  setUseProfile,
  setProfileImage,
  setProfileImageUri,
}: CharacterSelectPopupProps) {
  const [previewSkinColor, setPreviewSkinColor] = useState<string>(skinColor);
  const [previewClothesColor, setPreviewClothesColor] =
    useState<string>(clothesColor);

  const selectCharacter = () => {
    setSkinColor(previewSkinColor);
    setClothesColor(previewClothesColor);
    setUseProfile(false);
    setProfileImage(undefined);
    setProfileImageUri("");
    setCharacterPopup(false);
  };

  return (
    <CardPopup
      onClose={() => setCharacterPopup(false)}
      onSuccess={() => selectCharacter()}
      confirmLabel="선택"
    >
      <View className="flex flex-col items-center gap-4">
        <Character
          clothName={previewClothesColor}
          skinName={previewSkinColor}
        />
        <NavMenu
          items={[
            { state: "skin", label: "피부" },
            { state: "cloth", label: "옷" },
          ]}
          state={characterOption}
          setState={setCharacterOption}
        />
        <View className="flex flex-col w-full">
          <FlatList
            numColumns={4}
            data={characterOption === "skin" ? skinColorData : clothColorData}
            renderItem={({ item }) => (
              <Pressable
                onPress={
                  characterOption === "skin"
                    ? () => setPreviewSkinColor(item.name)
                    : () => setPreviewClothesColor(item.name)
                }
              >
                <View
                  style={{ backgroundColor: item.color, margin: 5 }}
                  className="h-8 w-20 m-2 rounded-md"
                />
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </CardPopup>
  );
}
