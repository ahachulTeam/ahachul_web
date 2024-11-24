import type { ResponseOfImage } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';

export interface Article
  extends WithSubwayLineId,
    Partial<WithImages>,
    Partial<WithLikeCounts>,
    Partial<WithCommentCounts>,
    Partial<WithHashTags> {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  imageUrl?: string;
}

export interface ArticleDetail extends Omit<Article, 'image'> {
  images: ResponseOfImage[];
}

export interface WithArticleId {
  articleId: number;
}

export interface WithHashTags {
  hashTags: string[];
}

export interface WithImages {
  image: ResponseOfImage;
}

export interface WithLikeCounts {
  likeCnt: number;
}

export interface WithCommentCounts {
  commentCnt: number;
}
