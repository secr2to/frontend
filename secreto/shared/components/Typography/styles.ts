import { COLOR, TYPOGRAPHY_TYPE } from "./constant";

export const textStyle = (
  type: (typeof TYPOGRAPHY_TYPE)[keyof typeof TYPOGRAPHY_TYPE]
) => {
  switch (type) {
    case TYPOGRAPHY_TYPE.MAIN_TITLE:
      return "text-[16px] font-bold";
    case TYPOGRAPHY_TYPE.MAIN_REGULAR:
      return "text-[16px] font-normal";
    case TYPOGRAPHY_TYPE.SUB_BOLD:
      return "text-[14px] font-bold";
    case TYPOGRAPHY_TYPE.SUB_REGULAR:
      return "text-[14px] font-normal";
    case TYPOGRAPHY_TYPE.BODY_BOLD:
      return "text-[12px] font-bold";
    case TYPOGRAPHY_TYPE.BODY_REGULAR:
      return "text-[12px] font-normal";
    case TYPOGRAPHY_TYPE.CAPTION_BOLD:
      return "text-[10px] font-bold";
    case TYPOGRAPHY_TYPE.CAPTION_REGULAR:
      return "text-[10px] font-normal";
    case TYPOGRAPHY_TYPE.LABEL_BOLD:
      return "text-[8px] font-bold";
    case TYPOGRAPHY_TYPE.LABEL_REGULAR:
      return "text-[8px] font-normal";
  }
};

export const colorStyle = (color: (typeof COLOR)[keyof typeof COLOR]) => {
  switch (color) {
    case COLOR.PRIMARY:
      return "text-primary";
    case COLOR.PRIMARY_ACTIVE:
      return "text-primaryActive";
    case COLOR.SECONDARY:
      return "text-secondary";
    case COLOR.ERROR:
      return "text-error";
    case COLOR.SUCCESS:
      return "text-success";
    case COLOR.WARNING:
      return "text-warning";
    case COLOR.INFO:
      return "text-info";
    case COLOR.WHITE:
      return "text-white";
    case COLOR.BLACK:
      return "text-black";
    case COLOR.PURE_WHITE:
      return "text-pureWhite";
    case COLOR.PRIMARY2:
      return "text-primary2";
    case COLOR.GRAYLIGHT:
      return "text-grayLight";
    case COLOR.GRAYDARK:
      return "text-grayDark";
    case COLOR.ACTIVE:
      return "text-active-color";
    case COLOR.INACTIVE:
      return "text-inactive-color";
    case COLOR.REVERSE:
      return "text-reverse-color";
    case COLOR.DEFAULT:
      return "text-default-color";
    case COLOR.BASE:
      return "text-base-color";
    case COLOR.SELECTED:
      return "text-selected";
    case COLOR.UNSELECTED:
      return "text-unselected";
  }
};
