import React, { useMemo } from 'react';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { useUserStationStore } from 'entities/@use-subway-context/slice';
import TrainRealTimes from './TrainRealTimes';
import { TrainLineFilter } from './TrainLineFilter';
import { TrainErrorFallback } from './TrainErrorFallback';
import * as styles from './TrainInfo.css';

export const TrainInfo = () => {
  const { stations, setUserStations } = useUserStationStore((state) => state);
  const activatedStation = useMemo(() => stations[0], [stations]);
  const realTimesProps = useMemo(
    () => stations[0].stationInfos[0],
    [stations[0].stationInfos],
  );

  return (
    <section css={styles.section}>
      <TrainLineFilter
        stations={stations}
        activatedStation={activatedStation}
        setUserStations={setUserStations}
      />
      <QueryErrorBoundary
        keys={Object.values(realTimesProps)}
        errorFallback={TrainErrorFallback}
      >
        <TrainRealTimes {...realTimesProps} />
      </QueryErrorBoundary>
    </section>
  );
};
