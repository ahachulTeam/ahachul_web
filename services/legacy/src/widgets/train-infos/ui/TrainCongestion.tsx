import { useRef, useState } from 'react';

import { WithSubwayLineId } from 'features/subway-lines';
import { WithSubwayTrainId } from 'features/subway-trains';
import { useGetTrainCongestionInfo } from 'features/subway-trains/api/congestion-info';
import { motion } from 'framer-motion';
import throttle from 'lodash-es/throttle';
import { animateVariants } from 'shared/lib/config/animation/framer-motion';
import { useIsomorphicLayoutEffect } from 'shared/lib/hooks/useIsomorphicLayoutEffect';
import { subwayCongestionHexColors } from 'widgets/train-infos/lib/subway-congestion-hex-colors';
import { TrainEachSection } from 'widgets/train-infos/ui/TrainEachSection';
import { TrainIcon } from 'widgets/train-infos/ui/TrainIcon';

import { RecommendIcon } from '../static/icons/recommend';

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
      const width = (container.current as HTMLElement)?.getBoundingClientRect().width;
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
              <TrainEachSection roomNumber={idx + 1} color={subwayCongestionHexColors(color)} />
              {color === 'SMOOTH' && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  css={styles.indicator}
                  variants={animateVariants(0.3)}
                >
                  <RecommendIcon />
                  <span>추천</span>
                </motion.div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainCongestion;
