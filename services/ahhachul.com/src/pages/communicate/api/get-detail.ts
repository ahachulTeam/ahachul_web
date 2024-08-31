import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import type { IResponse } from 'entities/with-server';
import type { CommunityDetail } from '../model';
import type { ParamsOfCommunityDetail } from '../model/params';
import { COMMUNITY_QUERY_KEY } from './query-key';
import { AxiosResponse } from 'axios';

const getCommunityDetail = (params: ParamsOfCommunityDetail) =>
  base.get<IResponse<CommunityDetail>>(
    `${routes.community}/${params.articleId}`,
  );

export const communityDetailQuery = (params: ParamsOfCommunityDetail) => ({
  queryKey: getQueryKeys(COMMUNITY_QUERY_KEY).detail(params.articleId),
  queryFn: () => getCommunityDetail(params),
});

export const useGetCommunityDetail = (
  params: ParamsOfCommunityDetail,
  initialData: AxiosResponse<IResponse<CommunityDetail>>,
) =>
  useAuthQuery({
    queryKey: communityDetailQuery(params).queryKey,
    queryFn: communityDetailQuery(params).queryFn,
    options: {
      initialData,
      throwOnError: true,
      staleTime: 5 * 60 * 1000, // default: 5분, 글 수정 시에는 따로 업데이트 관리
    },
  });
