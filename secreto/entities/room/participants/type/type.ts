import { commonResponse } from "@/shared/type/type";

export type roomMemberInfo = {
  roomUserId: number;
  managerYn: boolean;
  standbyYn: boolean;
  nickname: string;
  selfIntroduction: string;
  searchId: string;
};

export type roomMemberProfile = {
  roomUserId: number;
  profileUrl: string;
};

export type getMembersInfoResponse = commonResponse<roomMemberInfo[]>;

export type getMembersProfileResponse = commonResponse<roomMemberProfile[]>;
