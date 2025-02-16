import { useMemo } from 'react';

import { useAuth } from '@/contexts';
import { useFetchUserFavoriteStations } from '@/services/user';
import { useUserStationStore } from '@/stores/subway';

import * as S from './Stations.styled';
import SubwayLineFilter from './subwayLineFilter/SubwayLineFilter';
import TrainRealTimes from './trainRealTimes/TrainRealTimes';

const Stations = () => {
  const { isCheckingAuthState } = useAuth();
  const { data: userFavoriteStations, isLoading } = useFetchUserFavoriteStations();
  const { stations, setUserStations } = useUserStationStore(state => state);

  console.log('userFavoriteStations:', userFavoriteStations);

  const activatedStation = useMemo(() => stations[0], [stations]);
  const realTimesProps = useMemo(
    () => ({ ...stations[0].stationInfos[0], name: stations[0].name as string }),
    [stations[0].stationInfos],
  );

  if (isLoading || isCheckingAuthState) return null;

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
