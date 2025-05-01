import { COLOR } from "../Typography/constant";
import { AUTH_PROVIDER } from "./constant";

export const containerStyle = (
  provider: (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER]
) => {
  switch (provider) {
    case AUTH_PROVIDER.KAKAO:
      return "bg-[#FEE500]";
    case AUTH_PROVIDER.GOOGLE:
      return "bg-pureWhite";
    case AUTH_PROVIDER.NAVER:
      return "bg-[#03C75A]";
  }
};

export const labelStyle = (
  provider: (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER]
) => {
  switch (provider) {
    case AUTH_PROVIDER.KAKAO:
      return COLOR.BLACK;
    case AUTH_PROVIDER.GOOGLE:
      return COLOR.BLACK;
    case AUTH_PROVIDER.NAVER:
      return COLOR.WHITE;
  }
};

export const buttonImage = (
  provider: (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER]
) => {
  switch (provider) {
    case AUTH_PROVIDER.KAKAO:
      return require("@/shared/images/kakaologo.svg");
    case AUTH_PROVIDER.GOOGLE:
      return require("@/shared/images/googlelogo.svg");
    case AUTH_PROVIDER.NAVER:
      return require("@/shared/images/naverlogo.svg");
  }
};

export const buttonLabel = (
  provider: (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER]
) => {
  switch (provider) {
    case AUTH_PROVIDER.KAKAO:
      return "카카오로 로그인";
    case AUTH_PROVIDER.GOOGLE:
      return "구글로 로그인";
    case AUTH_PROVIDER.NAVER:
      return "네이버로 로그인";
  }
};
