import { PROFILE_SIZE } from "./constant";

export const imageStyle = (
  size: (typeof PROFILE_SIZE)[keyof typeof PROFILE_SIZE]
) => {
  switch (size) {
    case PROFILE_SIZE.SMALL:
      return "size-[40px]";
    case PROFILE_SIZE.MEDIUM:
      return "size-[60px]";
    case PROFILE_SIZE.LARGE:
      return "size-[90px]";
    case PROFILE_SIZE.XLARGE:
      return "size-[155px]";
  }
};
