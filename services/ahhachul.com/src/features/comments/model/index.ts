import type { Article, WithLikeCounts } from 'features/articles';

type CommentStatus = 'CREATED' | 'DELETED';
export interface Comment
  extends Pick<Article, 'id' | 'writer' | 'content' | 'createdAt' | 'createdBy'>,
    Partial<WithLikeCounts> {
  status: CommentStatus;
  upperCommentId: Nullable<number>;
}

export interface CommentList {
  comments: {
    parentComment: Comment;
    childComments: Comment[];
  }[];
}
