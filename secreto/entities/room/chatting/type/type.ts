export type chatRoomsResponseData = {
  roomUserId: number;
  chattingRoomId: number;
  type: "ALL" | "MANITO" | "MANITI";
  lastChattingDate: Date;
};

export type message = {
  chattingMessageId: number;
  chattingRoomId: number;
  writerId: number;
  content: string;
  writeDate: Date;
  readYn: boolean;
};

export type sendMessageResponse = {
  data: message;
  message: string;
  timestamp: number;
};

export type chatRoomsResponse = {
  data: chatRoomsResponseData[];
  message: string;
  timestamp: number;
};

export type chattingMembersInfo = {
  chattingRoomId: number;
  chattingRoomType: "ALL" | "MANITO" | "MANITI";
  lastChattingDate: Date;
  participationInfoList: participant[];
};

export type participant = {
  roomUserId: number;
  nickname: string;
};

export type chattingMemebersResponse = {
  data: chattingMembersInfo[];
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

export type chattingMessagesResponse = {
  data: message[];
  message: string;
  timestamp: number;
};
