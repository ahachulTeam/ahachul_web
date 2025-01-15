import type { IResponse } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';
import { TRAIN_CONGESTION_KEY } from 'features/subway-trains/api';
import type { Congestion, WithSubwayTrainId } from 'features/subway-trains/model';
import queryString from 'query-string';
import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import { sleep } from 'shared/lib/utils/delay/sleep';

interface APITrainCongestionInfoParams extends WithSubwayLineId, WithSubwayTrainId {}
interface APITrainCongestionInfoResponse extends WithSubwayTrainId {
  congestions: Congestion[];
}

const getTrainCongestionInfo = async (params: APITrainCongestionInfoParams) => {
  await sleep();
  return await base.get<IResponse<APITrainCongestionInfoResponse>>(
    `${routes['subway-trains-congestion']}?${queryString.stringify(params)}`,
  );
};

export const useGetTrainCongestionInfo = (params: APITrainCongestionInfoParams) => {
  return useAuthQuery({
    queryFn: () => getTrainCongestionInfo(params),
    queryKey: getQueryKeys(TRAIN_CONGESTION_KEY).list({ params }),
    options: {
      suspense: true,
      select: res => {
        return res.data.result;
      },
    },
  });
};
