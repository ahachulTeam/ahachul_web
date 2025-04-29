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
  const { userStations, setUserStations } = useUserStationStore(state => state);

  const currentStation = userStations[0];
  const currentSubwayLineInfo = currentStation.subwayLineInfoList[0];

  const stationId = currentStation.stationId;
  const subwayLineInfoList = currentStation.subwayLineInfoList;

  const queryClient = useQueryClient();
  const prefetchOtherLines = () => {
    const copy = [...subwayLineInfoList];
    copy.unshift();
    copy.forEach(async ({ subwayLineId }) => {
      await queryClient.fetchQuery({
        queryKey: subwayKeys.train(Object.values({ stationId, subwayLineId })),
        queryFn: () => fetchTrainInfo({ stationId, subwayLineId }),
      });
    });
  };

  const realTimesProps = () => ({
    ...currentSubwayLineInfo,
    stationId: currentStation.stationId,
    stationName: currentStation.stationName,
  });

  if (isCheckingAuthState) return null;

  return (
    <section css={S.section}>
      <SubwayLineFilter
        userStations={userStations}
        currentStation={currentStation}
        setUserStations={setUserStations}
      />
      <TrainRealTimes {...realTimesProps()} prefetchOtherLines={prefetchOtherLines} />
    </section>
  );
};

export default Stations;
