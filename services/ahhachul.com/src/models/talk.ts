import { YesNoLiteralType } from "./common";

export type TalkLoungeFilterType = {
  categoryType: TalkCategoryType;
  subwayLineId: number;
  content: string;
  hashTag: string;
  hotPostYn: YesNoLiteralType;
  page: number;
  size: number;
  sort: string;
};

export interface TalkLoungeOverview {
  id: number;
  title: string;
  content: string;
  categoryType: TalkCategoryType;
  hashTags: string[];
  commentCnt: number;
  viewCnt: number;
  likeCnt: number;
  hotPostYn: YesNoLiteralType;
  regionType: string; // TODO: 타입 구체화
  subwayLineId: number;
  createdAt: string;
  createdBy: string;
  writer: string;
  image: TalkRoomImage;
}

export interface TalkLoungeListDto {
  hasNext: boolean;
  nextPageNum: number;
  posts: TalkLoungeOverview[];
}

export type TalkRoomDetailIdType = {
  talkRoomDetailId: string;
};

export interface TalkRoomDetails {
  id: number;
  title: string;
  content: string;
  categoryType: TalkCategoryType;
  hashTags: string[];
  viewCnt: number;
  likeCnt: number;
  hateCnt: number;
  likeYn: YesNoLiteralType;
  hateYn: YesNoLiteralType;
  hotPostYn: YesNoLiteralType;
  regionType: string; // TODO: 타입 구체화
  subwayLineId: number;
  createdAt: string;
  createdBy: string;
  writer: string;
  images: TalkRoomImage[];
}

export type TalkRoomImage = {
  imageId: number;
  imageUrl: string;
};

export type TalkCategoryType = "FREE" | "INSIGHT" | "ISSUE" | "HUMOR";
