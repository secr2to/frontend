import { Button, Inputbox, Typography } from "@/shared/components";
import AddIcon from "@/shared/components/Icons/addIcno";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { useCallback, useRef, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useRegistFeed } from "@/entities/room/feeds/feed/query/useRegistFeed";

export default function RegistFeed() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const params = useLocalSearchParams() as { selectedTags?: string };
  const selectedTags = params.selectedTags
    ? JSON.parse(params.selectedTags)
    : [];
  const { roomId } = useLocalSearchParams() as { roomId: string };
  const { mutate: registFeed } = useRegistFeed();

  const pickProfile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 0.3,
      selectionLimit: 4,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets[0].uri) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      const imageFiles = result.assets.map((asset) => {
        const uri = asset.uri;
        const fileName = uri.split("/").pop() || "image";
        const fileType = uri.split(".").pop() || "image/jpeg";

        return {
          uri,
          name: fileName,
          type: fileType,
        } as any;
      });

      setImageFiles(imageFiles);
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  const handleOpenTagModal = () => {
    router.push({
      pathname: "./selectTag",
      params: { selectedTags: JSON.stringify(selectedTags) },
    });
  };

  const handleRegist = useCallback(() => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    selectedTags.forEach((tag: string) => {
      formData.append("tags", tag);
    });
    registFeed({ roomId, feedData: formData });
  }, [content, imageFiles, selectedTags, title, roomId]);

  return (
    <ScrollView className="flex-1 bg-default-background">
      <View className="relative flex-1">
        <View className="flex p-6 rounded-md gap-4">
          <View className="w-full aspect-square bg-inactive-background rounded-md">
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              contentContainerStyle={{ width: `${100 * (images.length + 1)}%` }}
            >
              {images.map((image, idx) => {
                return (
                  <View className="h-full aspect-square" key={idx.toString()}>
                    <Image
                      source={{ uri: image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                );
              })}
              <View className="h-full aspect-square">
                <View className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <Pressable onPress={() => pickProfile()}>
                    <AddIcon />
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
          <View className="gap-2">
            <Inputbox
              placeholder="제목을 입력해주세요."
              value={title}
              setValue={setTitle}
              activeBorder={false}
            />
            <Inputbox
              multiline={true}
              className="h-[120px] border border-inactive-background rounded-md p-2"
              placeholder="피드 내용을 입력해주세요."
              value={content}
              setValue={setContent}
              activeBorder={false}
            />
          </View>
        </View>
        <Pressable onPress={handleOpenTagModal}>
          <View className="relative flex px-10 py-4 border-y border-inactive-background">
            <Typography label={`태그하기`} style={TYPOGRAPHY_TYPE.MAIN_TITLE} />
            <View className="absolute right-5 top-3 flex-row items-center">
              <Typography
                label={`${selectedTags.length}명`}
                style={TYPOGRAPHY_TYPE.MAIN_TITLE}
              />
              <Image
                source={require("@/shared/images/back.png")}
                className="rotate-180 size-6"
              />
            </View>
          </View>
        </Pressable>
        <View className="mt-10 bottom-5 w-full px-5 self-center">
          <Button
            label="공유"
            size="large"
            disabled={!title || !content || imageFiles.length <= 0}
            onPress={handleRegist}
          />
        </View>
      </View>
    </ScrollView>
  );
}
