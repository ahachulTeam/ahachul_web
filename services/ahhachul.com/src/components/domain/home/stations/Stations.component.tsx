import { useMemo } from 'react';

import { useAuth } from '@/contexts';
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

  if (isCheckingAuthState) return null;

  return (
    <section css={S.section}>
      <SubwayLineFilter
        stations={stations}
        setUserStations={setUserStations}
        activatedStation={activatedStation}
      />
      <TrainRealTimes {...realTimesProps} />
    </section>
  );
};

export default Stations;
