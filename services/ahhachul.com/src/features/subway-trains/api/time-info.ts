import queryString from 'query-string';

import { TRAIN_KEY } from 'features/subway-trains/api';
import type { ITrain } from 'features/subway-trains/model';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { WithSubwayStationId } from 'features/subway-stations';
import type { IResponse } from 'entities/with-server';
import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';

interface APITrainInfoParams extends WithSubwayLineId, WithSubwayStationId {}
interface APITrainInfoResponse {
  trainRealTimes: ITrain[];
}

const getTrainInfo = (params: APITrainInfoParams) =>
  base.get<IResponse<APITrainInfoResponse>>(
    `${routes['subway-trains']}?${queryString.stringify(params)}`,
  );

export const trainInfoQuery = (params: APITrainInfoParams) => ({
  queryKey: getQueryKeys(TRAIN_KEY).list({ params }),
  queryFn: () => getTrainInfo(params),
});

export const useGetTrainInfo = (params: APITrainInfoParams) =>
  useAuthQuery({
    queryFn: trainInfoQuery(params).queryFn,
    queryKey: trainInfoQuery(params).queryKey,
    options: {
      suspense: true,
      select: (res) => {
        return res.data.result;
      },
    },
  });
