import React from "react";
import { View, Image, Text, ImageSourcePropType } from "react-native";
import { clsx } from "../../utils";
import { PROFILE_SIZE } from "./constant";
import { imageStyle } from "./styles";

interface ProfileProps {
  imageUri: ImageSourcePropType | string;
  size?: (typeof PROFILE_SIZE)[keyof typeof PROFILE_SIZE];
  className?: string;
}

const Profile = ({
  imageUri,
  size = PROFILE_SIZE.MEDIUM,
  className,
}: ProfileProps) => {
  return (
    <View
      className={clsx(
        className,
        "flex items-center justify-center",
        imageStyle(size),
        "rounded-full overflow-hidden border border-grayLight"
      )}
    >
      <Image
        source={typeof imageUri === "string" ? { uri: imageUri } : imageUri}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Profile;
