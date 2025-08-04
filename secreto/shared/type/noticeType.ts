export const user_noticeType = {
  REPLY: "REPLY", // 피드 답글
  NESTED_REPLY: "NESTED_REPLY", // 피드 답글의 답글
  TAG: "TAG", // 피드 태그
} as const;

export const room_noticeType = {
  INGAME_PROFILE_INFO: "INGAME_PROFILE_INFO", // 인게임 프로필 생성
  USER_ACCEPT: "USER_ACCEPT", // 유저 수락
  USER_REJECT: "USER_REJECT", // 유저 거절
  INGAME_INTRODUCTION: "INGAME_INTRODUCTION", // 인게임 프로필 자기소개 변경
  INGAME_PROFILE_IMAGE: "INGAME_PROFILE_IMAGE",
  ROOM_IMAGE: "ROOM_IMAGE", // 방 이미지 변경
  ROOM_INFORMATION: "ROOM_INFORMATION", // 방 정보 변경
  ROOM_START: "ROOM_START", // 방 시작
  MISSION: "MISSION", // 미션 제시
  ROOM_END: "ROOM_END", // 방 종료
} as const;

export const chatting_noticeType = {
  CHATTING: "CHATTING", // 채팅 메시지
} as const;
