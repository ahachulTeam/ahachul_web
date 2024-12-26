import { useSuspenseQuery } from '@tanstack/react-query';

import { apiClient } from '@/app/api';
import type { IResponse } from '@/model/Utils';
import type { CommentList } from '@/model/Comment';
import { TIMESTAMP } from '@/common/constants/time';
import { generateQueryKey } from '@/common/utils/react-query';

const getLostFoundComments = (articleId: number) =>
  apiClient.get<IResponse<CommentList>>(`/lost-posts/${articleId}/comments`);

export const useGetLostFoundComments = (articleId: number) =>
  useSuspenseQuery({
    queryKey: generateQueryKey(['LOST_FOUND']).comments(articleId),
    queryFn: () => getLostFoundComments(articleId),
    staleTime: 5 * TIMESTAMP.MINUTE, // default: 5분, 글 수정 시에는 따로 업데이트 관리
    select: (res) => {
      return res.data.result;
    },
  });
