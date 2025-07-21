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

export type gameStartResponseData = {
  roomId: number;
};

export type changeRoomResponse = {
  timestamp: number;
  message: string;
  data: changeRoomResponseData;
};

export type changeMemberResponse = {
  timestamp: number;
  message: string;
  data: memberResponseData[];
};

export type systemMission = {
  systemMissionId: number;
  content: string;
};

export type getMyRoleResponseData = {
  isManagerYn: boolean;
};

export type getMissionsResponse = {
  timestamp: number;
  message: string;
  data: systemMission[];
};

export type settingProfileResponseData = {
  roomUserId: number;
};

export type settingProfileResponse = {
  timestamp: number;
  message: string;
  data: settingProfileResponseData;
};

export type getMyRoleResponse = {
  timestamp: number;
  message: string;
  data: getMyRoleResponseData;
};

export type gameStartResponse = {
  timestamp: number;
  message: string;
  data: gameStartResponseData;
};
