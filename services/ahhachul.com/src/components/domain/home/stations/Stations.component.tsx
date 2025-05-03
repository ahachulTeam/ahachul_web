import { useAuth } from '@/contexts';
import { useUserStationStore } from '@/stores/subway';

import * as S from './Stations.styled';
import SubwayLineFilter from './subwayLineFilter/SubwayLineFilter.component';
import TrainRealTimes from './trainRealTimes/TrainRealTimes.component';

const Stations = () => {
  const { isCheckingAuthState } = useAuth();
  const { userStations, setUserStations } = useUserStationStore(state => state);

  const currentStation = userStations[0];
  const currentSubwayLineInfo = currentStation.subwayLineInfoList[0];

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
      <TrainRealTimes {...realTimesProps()} />
    </section>
  );
};

export default Stations;
