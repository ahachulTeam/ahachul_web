type CommentStatus = 'CREATED' | 'DELETED';

export type Comment = {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  status: CommentStatus;
  upperCommentId: number | null;
  likeCnt?: number;
} & Partial<OptionalCommentFields>;

export type OptionalCommentFields = {
  likeCnt: number;
};

export interface CommentList {
  comments: {
    parentComment: Comment;
    childComments: Comment[];
  }[];
}
