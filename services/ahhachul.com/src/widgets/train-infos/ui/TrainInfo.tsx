import { Suspense, useMemo } from 'react';

import { useUserStationStore } from 'entities/@use-subway-context/slice';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';

import { TrainErrorFallback } from './TrainErrorFallback';
import * as styles from './TrainInfo.css';
import { TrainLineFilter } from './TrainLineFilter';
import TrainRealTimes from './TrainRealTimes';

export const TrainInfo = () => {
  const { stations, setUserStations } = useUserStationStore(state => state);
  const activatedStation = useMemo(() => stations[0], [stations]);
  const realTimesProps = useMemo(
    () => ({ ...stations[0].stationInfos[0], name: stations[0].name }),
    [stations[0].stationInfos],
  );

  return (
    <section css={styles.section}>
      <TrainLineFilter
        stations={stations}
        activatedStation={activatedStation}
        setUserStations={setUserStations}
      />
      <QueryErrorBoundary keys={Object.values(realTimesProps)} errorFallback={TrainErrorFallback}>
        <Suspense fallback={<div css={styles.trainRealTimes} />}>
          <TrainRealTimes {...realTimesProps} />
        </Suspense>
      </QueryErrorBoundary>
    </section>
  );
};
