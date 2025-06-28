export type ingameMission = {
  roomId: string;
  content: string;
  executeYn: boolean;
  createDate?: string;
};

export type getMissionsResponse = {
  message: string;
  timestamp: string;
  data: ingameMission[];
};
