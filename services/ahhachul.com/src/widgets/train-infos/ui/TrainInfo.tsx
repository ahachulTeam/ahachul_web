import React from 'react';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { TrainLineFilter } from './TrainLineFilter';
import * as styles from './TrainInfo.css';

const TrainRealTimes = React.lazy(() => import('./TrainRealTimes'));

export const TrainInfo = () => {
  let activatedStationId = '7';
  let activatedSubwayLineId = '2';
  let activatedSubwayInfo = {
    stationId: activatedStationId,
    subwayLineId: activatedSubwayLineId,
  };

  return (
    <section css={styles.section}>
      <TrainLineFilter stationId={activatedStationId} />
      <BaseErrorBoundary>
        <TrainRealTimes {...activatedSubwayInfo} />
      </BaseErrorBoundary>
    </section>
  );
};
