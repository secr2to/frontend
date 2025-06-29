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
  profileUrl: string;
  searchId: string;
};

export type getUserResponse = {
  timestamp: number;
  message: string;
  data: userInfo;
};

export type getUserLogoutResponse = {
  timestamp: number;
  message: string;
  data: null;
};
