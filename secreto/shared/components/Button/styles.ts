import { COLOR } from "../Typography/constant";
import { BUTTON_SIZE, BUTTON_STYLE } from "./constant";

export const buttonSize = (
  size: (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE]
) => {
  switch (size) {
    case BUTTON_SIZE.MENU:
      return "px-3 py-2 w-auto self-start";
    case BUTTON_SIZE.SMALL:
      return "flex-1 items-center justify-center min-h-[30px]";
    case BUTTON_SIZE.MEDIUM:
      return "flex-1 items-center justify-center min-h-[40px]";
    case BUTTON_SIZE.LARGE:
      return "flex-1 items-center justify-center min-h-[40px]";
  }
};

export const colorStyle = (
  style: (typeof BUTTON_STYLE)[keyof typeof BUTTON_STYLE]
) => {
  switch (style) {
    case BUTTON_STYLE.ACTIVE:
      return "bg-active-background";
    case BUTTON_STYLE.INACTIVE:
      return "bg-inactive-background";
    case BUTTON_STYLE.REVERSE:
      return "bg-reverse-background border border-active-background";
  }
};

export const labelStyle = (
  style: (typeof BUTTON_STYLE)[keyof typeof BUTTON_STYLE]
) => {
  switch (style) {
    case BUTTON_STYLE.ACTIVE:
      return COLOR.ACTIVE;
    case BUTTON_STYLE.INACTIVE:
      return COLOR.INACTIVE;
    case BUTTON_STYLE.REVERSE:
      return COLOR.REVERSE;
  }
};
