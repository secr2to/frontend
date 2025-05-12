import ky from "ky";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from "@/shared/stores/storage";
import useUserStore from "../stores/useUserStore";

let isRefreshing = false;
let refreshPromise: Promise<tokenRefreshResponse | null> | null = null;

interface ResponseBody {
  data: {
    tokenType: "accessToken" | "refreshToken";
  };
  message: string;
  timestamp: number;
}

const whiteList = ["auth/refresh-access-token", "auth/token"];

const api = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json; charset=utf8",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await getAccessToken();
        if (!whiteList.some((path) => request.url.includes(path)) && token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],

    afterResponse: [
      async (request, options, response) => {
        const responseBody: ResponseBody = await response.json();

        if (
          response.status === 401 &&
          responseBody.data?.tokenType === "accessToken"
        ) {
          const refreshToken = await getRefreshToken();

          if (!refreshToken) {
            useUserStore.getState().logout();
            return;
          }

          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = tokenRefresh()
              .then(async (refreshResponse) => {
                if (refreshResponse?.data?.accessToken) {
                  await saveAccessToken(refreshResponse.data.accessToken);
                  return refreshResponse;
                }
                useUserStore.getState().logout();
                return null;
              })
              .finally(() => {
                isRefreshing = false;
                refreshPromise = null;
              });
          }

          const refreshResult = await refreshPromise;

          if (refreshResult?.data?.accessToken) {
            const originalRequest = request.clone();
            const originalOptions = { ...options };
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${refreshResult.data.accessToken}`
            );
            return api(originalRequest, originalOptions);
          }
        } else if (
          response.status === 401 &&
          responseBody.data?.tokenType === "refreshToken"
        ) {
          useUserStore.getState().logout();
        }
      },
    ],
  },
});

interface tokenRefreshResponse {
  timestamp: number;
  message: string;
  data: {
    accessToken: string;
  };
}

const tokenRefresh = async (): Promise<tokenRefreshResponse | null> => {
  try {
    const response = await api.get("auth/refresh-access-token", {
      headers: {
        Authorization: `Bearer ${await getRefreshToken()}`,
      },
    });

    if (!response.ok) {
      useUserStore.getState().logout();
      return null;
    }
    return await response.json();
  } catch (e) {
    useUserStore.getState().logout();
    return null;
  }
};

export default api;
