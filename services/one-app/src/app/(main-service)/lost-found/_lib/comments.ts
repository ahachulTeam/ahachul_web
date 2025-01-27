import { useSuspenseQuery, useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/api/axios';
import { TIMESTAMP } from '@/constant';
import type { IResponse, Comment, CommentList } from '@/model';
import { generateQueryKey } from '@/util';

const getLostFoundComments = (articleId: number) =>
  axiosInstance.get<IResponse<CommentList>>(`/lost-posts/${articleId}/comments`);

export const useGetLostFoundComments = (articleId: number) =>
  useSuspenseQuery({
    queryKey: generateQueryKey(['LOST_FOUND']).comments(articleId),
    queryFn: () => getLostFoundComments(articleId),
    staleTime: 5 * TIMESTAMP.MINUTE, // default: 5분, 글 수정 시에는 따로 업데이트 관리
    select: res => {
      return res.data.result;
    },
  });

export const postLostFoundComment = async (data: {
  articleId: number;
  content: string;
  upperCommentId?: number;
  isPrivate?: boolean;
}) => {
  const { articleId, content, upperCommentId = null, isPrivate = false } = data;
  const response = await axiosInstance.post<
    IResponse<Pick<Comment, 'id' | 'upperCommentId' | 'content'>>
  >(`/lost-found/${articleId}/comments`, {
    content,
    upperCommentId,
    isPrivate,
  });
  return response.data;
};

export const useLostFoundPostComment = () => {
  return useMutation({
    mutationFn: postLostFoundComment,
  });
};
