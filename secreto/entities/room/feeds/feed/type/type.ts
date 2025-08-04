import { commonResponse } from "@/shared/type/type";

export type feed = {
  feedId: number;
  title: string;
  content: string;
  heartCount: number;
  heart: boolean;
  heartMessage: string;
  author: author;
  images: image[];
  createDate: Date;
  imageCount: number;
  replyCount: number;
};

export type author = {
  userId: number;
  searchId: string;
  profileUrl: string;
  roomUserId: number;
  roomNickname: string;
};

export type image = {
  imageUrl: string;
};

export type getFeedsResponse = commonResponse<{
  content: feed[];
  hasNext: boolean;
  offset: number;
}>;

export type repliy = {
  replyId: number;
  content: string;
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

export type getRepliesResponse = commonResponse<repliy[]>;

export type registFeedResponse = commonResponse<{ feedId: number }>;

export type updateFeedResponse = commonResponse<{ success: boolean }>;

export type likeFeedResponse = commonResponse<{ success: boolean }>;

export type cancelLikeFeedResponse = commonResponse<{ success: boolean }>;

export type deleteFeedResponse = commonResponse<{ success: boolean }>;
