export type myInfo = {
  roomUserId: number;
  managerYn: boolean;
  standbyYn: boolean;
  nickname: string;
  useProfileYn: boolean;
  selfIntroduction: string;
  profileUrl: string;
  skinColorRgb: string;
  clothesColorRgb: string;
  searchId: string;
};

export type getMyInfoResponse = {
  timestamp: number;
  message: string;
  data: myInfo;
};
