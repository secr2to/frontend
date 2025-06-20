export type registStep =
  | "roomName"
  | "endDate"
  | "missionPeriod"
  | "profile"
  | "introduction";

export type registRoomResponseData = {
  roomId: number;
};

export type registRoomResponse = {
  timestamp: number;
  message: string;
  data: registRoomResponseData;
};
