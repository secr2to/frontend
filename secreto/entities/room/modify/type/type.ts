export type changeSelfIntroductionResponse = {
  data: {
    roomUserId: number;
  };
  message: string;
  timestamp: number;
};

export type deleteRoomResponse = {
  message: string;
  timestamp: number;
  data: null;
};

export type endGameResponse = {
  data: null;
  message: string;
  timestamp: number;
};
