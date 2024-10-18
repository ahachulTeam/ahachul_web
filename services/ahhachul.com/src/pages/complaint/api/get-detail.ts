import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import type { IResponse } from 'entities/with-server';
import { TIMESTAMP } from 'shared/lib/config/timestamp';
import { COMPLAINT_QUERY_KEY } from './query-key';
import type { ComplaintDetail } from '../model';
import type { ParamsOfComplaintDetail } from '../model/params';

const getComplaintDetail = (params: ParamsOfComplaintDetail) =>
  base.get<IResponse<ComplaintDetail>>(
    `${routes.complaints}/${params.articleId}`,
  );

export const useGetComplaintDetail = (params: ParamsOfComplaintDetail) =>
  useAuthQuery({
    queryKey: getQueryKeys(COMPLAINT_QUERY_KEY).detail(params.articleId),
    queryFn: () => getComplaintDetail(params),
    options: {
      suspense: true,
      staleTime: 5 * TIMESTAMP.MINUTE, // default: 5분, 글 수정 시에는 따로 업데이트 관리
      select: (res) => {
        return res.data.result;
      },
    },
  });
