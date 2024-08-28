import { useRef, useState } from 'react';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import throttle from 'lodash-es/throttle';

import { useGetTrainCongestionInfo } from 'features/subway-trains/api/congestion-info';
import { subwayCongestionHexColors } from 'widgets/train-infos/lib/subway-congestion-hex-colors';
import { useIsomorphicLayoutEffect } from 'shared/lib/hooks/useIsomorphicLayoutEffect';
import { TrainIcon } from 'widgets/train-infos/ui/TrainIcon';
import { TrainSectionIcon } from 'widgets/train-infos/ui/TrainSectionIcon';
import * as styles from './TrainCongestion.css';
import { WithSubwayLineId } from 'features/subway-lines';
import { WithSubwayTrainId } from 'features/subway-trains';

interface TrainCongestionProps extends WithSubwayLineId, WithSubwayTrainId {}

const TrainCongestion = ({ trainNo, subwayLineId }: TrainCongestionProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const {
    data: { congestions },
  } = useGetTrainCongestionInfo({
    trainNo,
    subwayLineId,
  });

  const [width, setWidth] = useState(0);
  useIsomorphicLayoutEffect(() => {
    const detectionViewport = () => {
      const width = (container.current as HTMLElement)?.getBoundingClientRect()
        .width;
      setWidth(width);
    };

    detectionViewport();

    const handleDetectViewport = throttle(detectionViewport, 1000);
    window.addEventListener('resize', handleDetectViewport);

    return () => {
      window.removeEventListener('resize', handleDetectViewport);
    };
  }, []);

  return (
    <div css={styles.trainCongestions} ref={container}>
      {width && <TrainIcon width={width} />}
      {width && (
        <ul>
          {congestions.map(({ sectionNo, congestionColor: color }, idx) => (
            <li key={`${sectionNo}-${color}`}>
              <TrainSectionIcon
                roomNumber={idx + 1}
                color={subwayCongestionHexColors(color)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default withSuspense(TrainCongestion, {
  fallback: (
    <div css={{ color: 'white' }}>Loading Train Congestion info...</div>
  ),
});
