import ky from "ky";
import { getAccessToken, getRefreshToken } from "@/shared/stores/storage";

let isRefreshing = false;

const api = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = getAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],

    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401 && !response.url.includes("refresh")) {
          // token refresh logic
          const token = getRefreshToken();
          const originalRequest = request.clone();
          const originalOptions = { ...options };
          isRefreshing = false;
        }
      },
    ],
  },
});

export default api;
