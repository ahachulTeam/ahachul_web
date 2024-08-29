import React from 'react';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetTrainInfo } from 'features/subway-trains/api/time-info';
import * as styles from './TrainRealTimes.css';
import { WithSubwayLineId } from 'features/subway-lines';
import { WithSubwayStationId } from 'features/subway-stations';

const TrainCongestion = React.lazy(() => import('./TrainCongestion'));

interface TrainRealTimesProps extends WithSubwayLineId, WithSubwayStationId {}
const TrainRealTimes = ({ stationId, subwayLineId }: TrainRealTimesProps) => {
  const {
    data: { trainRealTimes },
  } = useGetTrainInfo({
    stationId,
    subwayLineId,
  });

  return (
    <div css={styles.trainRealTimes}>
      <TrainCongestion
        trainNo={trainRealTimes[0].trainNum}
        subwayLineId={subwayLineId}
      />
      <div css={styles.inner}>
        <ul>
          {trainRealTimes.map((item) => (
            <li key={item.trainNum}>
              <b>{item.trainNum}</b>
              <span>5분33초</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withSuspense(TrainRealTimes, {
  fallback: <div css={{ color: 'white' }}>Loading Train Real Time info...</div>,
});
