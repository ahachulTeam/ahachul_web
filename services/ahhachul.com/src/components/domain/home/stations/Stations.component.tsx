import { useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { fetchTrainInfo } from '@/apis/request/subway';
import { useAuth } from '@/contexts';
import { subwayKeys } from '@/services/subway';
import { useUserStationStore } from '@/stores/subway';

import * as S from './Stations.styled';
import SubwayLineFilter from './subwayLineFilter/SubwayLineFilter';
import TrainRealTimes from './trainRealTimes/TrainRealTimes';

const Stations = () => {
  const { isCheckingAuthState } = useAuth();
  const { stations, setUserStations } = useUserStationStore(state => state);

  const activatedStation = useMemo(() => stations[0], [stations]);
  const realTimesProps = useMemo(
    () => ({
      ...stations[0].subwayLineInfoList[0],
      stationName: stations[0].stationName,
      stationId: stations[0].stationId,
    }),
    [stations[0]],
  );

  const queryClient = useQueryClient();
  const stationId = stations[0].stationId;
  const subwayLineInfoList = stations[0].subwayLineInfoList;

  const prefetchOtherLines = async () => {
    const copy = [...subwayLineInfoList];
    copy.unshift();
    copy.forEach(async ({ subwayLineId }) => {
      await queryClient.fetchQuery({
        queryKey: subwayKeys.train(Object.values({ stationId, subwayLineId })),
        queryFn: () => fetchTrainInfo({ stationId, subwayLineId }),
      });
    });
  };

  if (isCheckingAuthState) return null;

  return (
    <section css={S.section}>
      <SubwayLineFilter
        stations={stations}
        setUserStations={setUserStations}
        activatedStation={activatedStation}
      />
      <TrainRealTimes {...realTimesProps} prefetchOtherLines={prefetchOtherLines} />
    </section>
  );
};

export default Stations;
