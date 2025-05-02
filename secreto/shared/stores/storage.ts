import { MMKV } from "react-native-mmkv";
import Constants from "expo-constants";

const encryptionKey = Constants.expoConfig?.extra?.MMKV_ENCRYPTION_KEY;

export const storage = new MMKV({
  id: "AppStorage",
  encryptionKey: encryptionKey,
});

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const saveAccessToken = (token: string) => {
  storage.set(ACCESS_TOKEN_KEY, token);
};

export const saveRefreshToken = (token: string) => {
  storage.set(REFRESH_TOKEN_KEY, token);
};

export const getAccessToken = (): string | undefined => {
  const token = storage.getString(ACCESS_TOKEN_KEY);
  return token ? token : undefined;
};

export const getRefreshToken = (): string | undefined => {
  const token = storage.getString(REFRESH_TOKEN_KEY);
  return token ? token : undefined;
};

export const clearTokens = () => {
  storage.delete(ACCESS_TOKEN_KEY);
  storage.delete(REFRESH_TOKEN_KEY);
};
