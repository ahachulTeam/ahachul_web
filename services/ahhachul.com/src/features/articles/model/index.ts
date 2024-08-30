import type { ResponseOfImage } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';

export interface WithArticleId {
  articleId: number;
}

export interface Article
  extends WithSubwayLineId,
    Partial<WithImages>,
    Partial<WithCounts>,
    Partial<WithHashTags> {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface WithHashTags {
  hashTags: string[];
}

export interface WithImages {
  image: ResponseOfImage;
}

export interface WithCounts {
  likeCnt: number;
  commentCnt: number;
}
