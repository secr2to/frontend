import { commonResponse } from "@/shared/type/type";

export type reply = {
  replyId: number;
  comment: string;
  createDate: Date;
  nestedReplyYn: boolean;
  nestedReplyCount: number;
  heartCount: number;
  heart: boolean;
  replier: replier;
};

export type replier = {
  userId: number;
  searchId: string;
  profileUrl: string;
  roomUserId: number;
  roomNickname: string;
};

export type replyData = {
  roomId: string;
  feedId: number;
  parentReplyId?: number;
  comment: string;
  mentionUserId?: number;
};

export type getRepliesResponse = commonResponse<{
  content: reply[];
  hasNext: boolean;
  offset: number;
}>;

export type registReplyResponse = commonResponse<{ feedId: number }>;

export type modifyReplyResponse = commonResponse<{ success: boolean }>;

export type deleteReplyResponse = commonResponse<{ success: boolean }>;

export type likeReplyResponse = commonResponse<{ success: boolean }>;

export type cancelLikeReplyResponse = commonResponse<{ success: boolean }>;
