import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import type { IResponse } from 'entities/with-server';
import type { LostFoundDetail } from '../model';
import type { ParamsOfLostFoundDetail } from '../model/params';

const LOST_FOUND_DETAIL_KEY = [routes['lost-found']];

const getLostFoundDetail = (params: ParamsOfLostFoundDetail) =>
  base.get<IResponse<LostFoundDetail>>(
    `${routes['lost-found']}/${params.articleId}`,
  );

export const useGetLostFoundDetail = (params: ParamsOfLostFoundDetail) =>
  useAuthQuery({
    queryKey: getQueryKeys(LOST_FOUND_DETAIL_KEY).detail(params.articleId),
    queryFn: () => getLostFoundDetail(params),
    options: {
      suspense: true,
      staleTime: 5 * 60 * 1000, // default: 5분, 글 수정 시에는 따로 업데이트 관리
      select: (res) => {
        return res.data.result;
      },
    },
  });
