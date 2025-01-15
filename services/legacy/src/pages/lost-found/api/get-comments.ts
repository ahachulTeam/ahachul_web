import type { IResponse } from 'entities/with-server';
import type { CommentList } from 'features/comments/model';
import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import { TIMESTAMP } from 'shared/lib/config/timestamp';

import { LOST_FOUND_QUERY_KEY } from './query-key';

const getLostFoundComments = (articleId: number) =>
  base.get<IResponse<CommentList>>(`${routes['lost-found']}/${articleId}/comments`);

export const useGetLostFoundComments = (articleId: number) =>
  useAuthQuery({
    queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).comments(articleId),
    queryFn: () => getLostFoundComments(articleId),
    options: {
      suspense: true,
      staleTime: 5 * TIMESTAMP.MINUTE, // default: 5분, 글 수정 시에는 따로 업데이트 관리
      select: res => {
        return res.data.result;
      },
    },
  });
