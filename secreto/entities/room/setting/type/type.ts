export type roomMember = {
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

export type getMembersResponse = {
  timestamp: number;
  message: string;
  data: roomMember[];
};

export type changeRoomResponseData = {
  roomId: number;
};

export type memberResponseData = {
  roomUserId: number;
};

export type changeRoomProfileResponse = {
  timestamp: number;
  message: string;
  data: changeRoomResponseData;
};

export type changeRoomResponse = {
  timestamp: number;
  message: string;
  data: changeRoomResponseData;
};

export type changeMemberResponse = {
  timestamp: number;
  message: string;
  data: memberResponseData;
};

export type systemMission = {
  systemMissionId: number;
  content: string;
};

export type getMissionsResponse = {
  timestamp: number;
  message: string;
  data: systemMission[];
};
