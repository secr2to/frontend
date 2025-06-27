export type chatRoomsResponseData = {
  roomUserId: number;
  chattingRoomId: number;
  type: "ALL" | "MANITO" | "MANITI";
  lastChattingDate: Date;
};

export type chatRoomsResponse = {
  data: chatRoomsResponseData[];
  message: string;
  timestamp: number;
};
