export type myInfo = {
  managerYn: boolean;
  nickname: string;
  profileUrl: string;
  roomCharacterUrl: string;
  roomUserId: number;
  searchId: string;
  selfIntroduction: string;
  standbyYn: boolean;
  useProfileYn: boolean;
};

export type getMyInfoResponse = {
  timestamp: number;
  message: string;
  data: myInfo;
};
