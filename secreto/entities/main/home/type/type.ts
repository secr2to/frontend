export type roomStatus = "WAITING" | "PROGRESS" | "TERMINATED";

export type roomsInfo = {
  roomId: number;
  name: string;
  status: roomStatus;
  code: string;
  startDate: string;
  endDate: string;
  missionPeriod: number;
  imageUrl: string;
  roomUserCount: number;
  nickname: string;
};

export type joinRoomInfo = {
  roomId: number;
};

export type joinRoomResponse = {
  timestamp: number;
  message: string;
  data: joinRoomInfo;
};

export type getRoomsResponse = {
  timestamp: number;
  message: string;
  data: roomsInfo[];
};
