import { roomStatus } from "@/entities/main/home/type/type";

export type registStep =
  | "roomName"
  | "endDate"
  | "missionPeriod"
  | "profile"
  | "introduction";

export type registRoomResponseData = {
  roomId: number;
};

export type roomInfo = {
  roomId: string;
  name: string;
  status: roomStatus;
  code: string;
  startData: string;
  endDate: string;
  missionPeriod: string;
  imageUrl: string;
};

export type registRoomResponse = {
  timestamp: number;
  message: string;
  data: registRoomResponseData;
};

export type getRoomInfoResponse = {
  timestamp: number;
  message: string;
  data: roomInfo;
};
