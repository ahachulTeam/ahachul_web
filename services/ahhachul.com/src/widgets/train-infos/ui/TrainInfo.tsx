import React from 'react';
import * as styles from './TrainInfo.css';

import { TrainLineFilter } from './TrainLineFilter';

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
      <TrainRealTimes {...activatedSubwayInfo} />
    </section>
  );
};
