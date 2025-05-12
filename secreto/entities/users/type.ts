export type serviceToken = {
  accessToken: string;
  refreshToken: string;
};

export type getTokenResponse = {
  timestamp: number;
  message: string;
  data: serviceToken;
};

export type userInfo = {
  userId: number;
  provider: string;
  role: string;
  email: string;
  nickname: string;
  profileUrl: string;
};

export type getUserResponse = {
  timestamp: number;
  message: string;
  data: userInfo;
};
