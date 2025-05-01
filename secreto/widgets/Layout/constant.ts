import { ImageSourcePropType } from "react-native";

export type menuItem = {
  label: inGameMenuLabel | globalMenuLabel;
  path: inGameMenuPath | globalMenuPath;
  source: ImageSourcePropType;
  activeSource: ImageSourcePropType;
};

export type inGameMenuLabel =
  | "미션"
  | "채팅"
  | "피드"
  | "참여 인원"
  | "마이페이지";
export type inGameMenuPath =
  | "mission"
  | "chatting"
  | "index"
  | "participant"
  | "myPage";

export type globalMenuLabel = "커뮤니티" | "홈" | "마이페이지";
export type globalMenuPath = "community" | "index" | "myPage";
