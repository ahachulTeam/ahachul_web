import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import type { IResponse } from 'entities/with-server';
import type { CommunityDetail } from '../model';
import type { ParamsOfCommunityDetail } from '../model/params';

const COMMUNITY_DETAIL_KEY = [routes.community];

const getCommunityDetail = (params: ParamsOfCommunityDetail) =>
  base.get<IResponse<CommunityDetail>>(
    `${routes.community}/${params.articleId}`,
  );

export const useGetCommunityDetail = (params: ParamsOfCommunityDetail) =>
  useAuthQuery({
    queryKey: getQueryKeys(COMMUNITY_DETAIL_KEY).detail(params.articleId),
    queryFn: () => getCommunityDetail(params),
    options: {
      suspense: true,
      staleTime: 5 * 60 * 1000, // default: 5분, 글 수정 시에는 따로 업데이트 관리
      select: (res) => {
        return res.data.result;
      },
    },
  });
