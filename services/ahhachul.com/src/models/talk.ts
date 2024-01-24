import { Nullable, YesNoLiteralType } from "./common";
import { SubwayLineIdType } from "./subway";

export type TalkLoungeFilterType = {
  content?: string;
  hashTag?: string;
  hotPostYn?: YesNoLiteralType;
  subwayLineId?: SubwayLineIdType;
  categoryType?: TalkCategoryType;
  sort: string;
  page: number;
  size: number;
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
  subwayLineId: SubwayLineIdType;
  createdAt: string;
  createdBy: string;
  writer: string;
  image: TalkRoomImage;
}

export interface TalkLoungeDto {
  hasNext: boolean;
  nextPageNum: Nullable<number>;
  posts: TalkLoungeOverview[];
}

export type TalkRoomIdType = {
  talkRoomId: string;
};

export interface TalkRoomDto {
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
  subwayLineId: SubwayLineIdType;
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
