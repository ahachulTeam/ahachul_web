import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import type { IResponse } from 'entities/with-server';
import type { CommentList } from 'features/comments/model';
import { TIMESTAMP } from 'shared/lib/config/timestamp';
import { LOST_FOUND_QUERY_KEY } from './query-key';
import type { ParamsOfLostFoundDetail } from '../model/params';

const getLostFoundComments = (params: ParamsOfLostFoundDetail) =>
  base.get<IResponse<CommentList>>(
    `${routes['lost-found']}/${params.articleId}/comments`,
  );

export const useGetLostFoundComments = (params: ParamsOfLostFoundDetail) =>
  useAuthQuery({
    queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).comments(params.articleId),
    queryFn: () => getLostFoundComments(params),
    options: {
      suspense: true,
      staleTime: 5 * TIMESTAMP.MINUTE, // default: 5분, 글 수정 시에는 따로 업데이트 관리
      select: (res) => {
        return res.data.result;
      },
    },
  });
