import React, { useState } from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { clsx } from "../../utils";
import { PROFILE_SIZE } from "./constant";
import { imageStyle } from "./styles";

interface ProfileProps {
  imageUri: ImageSourcePropType | string;
  size?: (typeof PROFILE_SIZE)[keyof typeof PROFILE_SIZE];
  className?: string;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  defaultSource?: ImageSourcePropType;
}

const Profile = ({
  imageUri,
  size = PROFILE_SIZE.MEDIUM,
  className,
  resizeMode = "cover",
  defaultSource,
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
        defaultSource={
          defaultSource
            ? defaultSource
            : require("@/shared/images/defaultProfile.png")
        }
        style={{ width: "100%", height: "100%" }}
        resizeMode={resizeMode}
      />
    </View>
  );
};

export default Profile;
