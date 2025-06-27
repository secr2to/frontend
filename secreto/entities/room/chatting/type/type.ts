export type chatRoomsResponseData = {
  roomUserId: number;
  chattingRoomId: number;
  type: "ALL" | "MANITO" | "MANITI";
  lastChattingDate: Date;
};

export type sendMessageResponseData = {
  chatMessageId: number;
  writerId: number;
  content: string;
  writeDate: Date;
  readYn: boolean;
};

export type sendMessageResponse = {
  data: sendMessageResponseData;
  message: string;
  timestamp: number;
};

export type chatRoomsResponse = {
  data: chatRoomsResponseData[];
  message: string;
  timestamp: number;
};

export type chattingMessageType = {
  chattingMessageId: number;
  chattingRoomId: number;
  content: string;
  readYn: boolean;
  writeDate: Date;
  writerId: number;
};
