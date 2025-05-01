import { menuItem } from "./constant";

export const inGameNavData: menuItem[] = [
  {
    label: "미션",
    path: "mission",
    source: require("@/shared/images/mission.png"),
    activeSource: require("@/shared/images/missionActive.png"),
  },
  {
    label: "채팅",
    path: "chatting",
    source: require("@/shared/images/chatting.png"),
    activeSource: require("@/shared/images/chattingActive.png"),
  },
  {
    label: "피드",
    path: "index",
    source: require("@/shared/images/feed.png"),
    activeSource: require("@/shared/images/feedActive.png"),
  },
  {
    label: "참여 인원",
    path: "participant",
    source: require("@/shared/images/participant.png"),
    activeSource: require("@/shared/images/participantActive.png"),
  },
  {
    label: "마이페이지",
    path: "myPage",
    source: require("@/shared/images/mypage.png"),
    activeSource: require("@/shared/images/mypageActive.png"),
  },
];

export const globalNavData: menuItem[] = [
  {
    label: "커뮤니티",
    path: "community",
    source: require("@/shared/images/community.png"),
    activeSource: require("@/shared/images/communityActive.png"),
  },
  {
    label: "홈",
    path: "index",
    source: require("@/shared/images/home.png"),
    activeSource: require("@/shared/images/homeActive.png"),
  },
  {
    label: "마이페이지",
    path: "myPage",
    source: require("@/shared/images/mypage.png"),
    activeSource: require("@/shared/images/mypageActive.png"),
  },
];
