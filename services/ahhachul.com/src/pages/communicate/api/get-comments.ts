import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import type { IResponse } from 'entities/with-server';
import type { CommentList } from 'features/comments/model';
import type { ParamsOfCommunityDetail } from '../model/params';
import { COMMUNITY_QUERY_KEY } from './query-key';

const getCommunityComments = (params: ParamsOfCommunityDetail) =>
  base.get<IResponse<CommentList>>(
    `${routes['community-comments']}?postId=${params.articleId}`,
  );

export const useGetCommunityComments = (params: ParamsOfCommunityDetail) =>
  useAuthQuery({
    queryKey: getQueryKeys(COMMUNITY_QUERY_KEY).comments(params.articleId),
    queryFn: () => getCommunityComments(params),
    options: {
      suspense: true,
      staleTime: 5 * 60 * 1000, // default: 5분, 글 수정 시에는 따로 업데이트 관리
      select: (res) => {
        return res.data.result;
      },
    },
  });
