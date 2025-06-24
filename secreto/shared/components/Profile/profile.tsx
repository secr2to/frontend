import React, { useState } from "react";
import { View, Image, Text, ImageSourcePropType } from "react-native";
import { clsx } from "../../utils";
import { PROFILE_SIZE } from "./constant";
import { imageStyle } from "./styles";

interface ProfileProps {
  imageUri: ImageSourcePropType | string;
  size?: (typeof PROFILE_SIZE)[keyof typeof PROFILE_SIZE];
  className?: string;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

const Profile = ({
  imageUri,
  size = PROFILE_SIZE.MEDIUM,
  className,
  resizeMode = "cover",
}: ProfileProps) => {
  const [isLoading, setIsLoading] = useState(true);
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
        source={
          isLoading
            ? require("@/shared/images/default.png")
            : typeof imageUri === "string"
            ? { uri: imageUri }
            : imageUri
        }
        style={{ width: "100%", height: "100%" }}
        resizeMode={resizeMode}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

export default Profile;
