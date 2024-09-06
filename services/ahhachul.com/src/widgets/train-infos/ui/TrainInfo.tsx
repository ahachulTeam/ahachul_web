import React, { useMemo } from 'react';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { useUserStationStore } from 'entities/@use-subway-context/slice';
import TrainRealTimes from './TrainRealTimes';
import { TrainLineFilter } from './TrainLineFilter';
import * as styles from './TrainInfo.css';

export const TrainInfo = () => {
  const { stations, setUserStations } = useUserStationStore((state) => state);
  const activatedStation = useMemo(() => stations[0], [stations]);
  const realTimesProps = useMemo(
    () => stations[0].stationInfos[0],
    [stations[0].stationInfos],
  );
  console.log('realTimesProps:', realTimesProps);

  return (
    <section css={styles.section}>
      <TrainLineFilter
        stations={stations}
        activatedStation={activatedStation}
        setUserStations={setUserStations}
      />
      <BaseErrorBoundary>
        <TrainRealTimes {...realTimesProps} />
      </BaseErrorBoundary>
    </section>
  );
};
