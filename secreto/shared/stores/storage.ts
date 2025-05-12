import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const saveAccessToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch (e) {
    console.error("Error saving access token", e);
  }
};

export const saveRefreshToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch (e) {
    console.error("Error saving refresh token", e);
  }
};

export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    if (token !== null) {
      return token;
    }
    return "";
  } catch (e) {
    console.error("Error retrieving access token", e);
  }
};

export const getRefreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    if (token !== null) {
      return token;
    }
    return "";
  } catch (e) {
    console.error("Error retrieving refresh token", e);
  }
};

export const userLogOut = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (e) {
    console.error("Error clearing tokens", e);
  }
};
